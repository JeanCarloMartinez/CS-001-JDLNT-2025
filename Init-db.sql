CREATE DATABASE IF NOT EXISTS sistema_login;
USE sistema_login;

CREATE TABLE IF NOT EXISTS alumnos (
  matricula VARCHAR(10) PRIMARY KEY,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO alumnos (matricula, nombres, apellidos, email, password) VALUES
('A001', 'Carlos', 'Sánchez López', 'carlos@example.com', '1234'),
('A002', 'María', 'Gómez Torres', 'maria@example.com', 'abcd');