# Imagen base con Node
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del backend
COPY package*.json ./
RUN npm install
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["node", "App.js"]