const express = require("express");
const router = express.Router();
const Joi = require("joi");
const libros = require('../data');

const libroSchema = Joi.object({
  titulo: Joi.string().required().label("Título"),
  autor: Joi.string().required().label("Autor"),
});

// Obtener toda la coleccion de libros
router.get("/", (req, res, next) => {
  try {
    res.json(libros);
  } catch (err) {
    next(err);
  }
});

// Obtener un libro por su id
router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const libro = libros.find((l) => l.id === id);

    if (!libro) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }

    res.json(libro);
  } catch (err) {
    next(err);
  }
});

//Añadir un nuevo libro a la coleccion
router.post("/", (req, res, next) => {
  try {
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Error de validacion");
      validationError.Status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { titulo, autor } = value;

    const nuevoLibro = {
      id: libros.length + 1,
      titulo,
      autor,
    };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
  } catch (err) {
    next(err);
  }
});

//Modificar un libro de la coleccion
router.put("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Error de validacion");
      validationError.Status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { titulo, autor } = value;
    const libro = libros.find((l) => l.id === id);

    if (!libro) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }

    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;

    res.json(libro);
  } catch (err) {
    next(err);
  }
});

//Eliminar un libro 
router.delete("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const index = libros.findIndex((l) => l.id === id);

    if (index === -1) {
        const error = new Error('Libro no encontrado');
        error.status = 404;
        throw error;
    }

    const libroEliminado = libros.splice(index, 1);
    res.json(libroEliminado[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
