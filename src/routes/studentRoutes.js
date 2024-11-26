const express = require('express');
const studentController = require('../controllers/studentController'); // Controlador de alunos

const router = express.Router();

// Endpoint para listar todos os alunos de um curso específico
router.get('/course/:courseId', studentController.getStudentsByCourse);

// Endpoint para adicionar um novo aluno
router.post('/', studentController.addStudent);

// Endpoint para editar os dados de um aluno
router.put('/:id', studentController.editStudent);

// Endpoint para excluir um aluno
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
