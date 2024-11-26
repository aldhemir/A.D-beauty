const express = require('express');
const courseController = require('../controllers/courseController'); // Controlador de cursos

const router = express.Router();

// Endpoint para listar os cursos
router.get('/', courseController.getCourses);

// Endpoint para obter um curso específico
router.get('/:id', courseController.getCourseById);

module.exports = router;
