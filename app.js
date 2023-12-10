const express = require("express");
const app = express();
const routeLibros = require('./Routes/libros');
const errorHandler = require('./Middleware/errorHandler')

app.use(express.json());

app.use('/libros', routeLibros);

app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor Express.js funcionando en https://localhost:${port}`);
});