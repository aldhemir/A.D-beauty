const express = require('express');
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');  // Adicionei aqui

const router = express.Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de cursos
router.use('/courses', courseRoutes);

// Rotas de alunos
router.use('/students', studentRoutes);  // Adicionei aqui

module.exports = router;
