// Importar express para crear el servidor
const express = require('express');
// Importar mysql para la conexion con la base de datos
const mysql = require('mysql2');

// Inicializar la app de express
const app = express();
// Middleware para permitir recibir datos JSON
app.use(express.json());

// Codigo agregado
// Middleware para recibir datos de formularios HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));


app.use(express.static('Public')); // Linea de acceso a Public

// Crear la conexion con la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpass',
    database: 'sistema_login'
});

// Establecer la conexion
conexion.connect((err) => {
    if (err) {
        console.log('Error: ' + err.message);
    } else {
        console.log('Conexion exitosa');
    }
});

// Ruta para comprobar que el servidor esta corriendo
app.get('/', (req, res) => {
    res.send('Hello World from Connect Studio')
});

// El servidor escucha el puerto 3000
app.listen(3000, () => {
    console.log('Servidor ejecutandose en el puerto 3000');
});

// Codigo agregado

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Campos incompletos' });
    }

    const query = 'SELECT * FROM alumnos WHERE email = ? AND password = ?';
    conexion.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Login exitoso
        const alumno = results[0];
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            alumno: {
                matricula: alumno.matricula,
                nombres: alumno.nombres,
                apellidos: alumno.apellidos,
                email: alumno.email
            }
        });
    });
});