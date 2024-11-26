const express = require('express');
const authController = require('../controllers/authController'); // Controlador de autenticação

const router = express.Router();

// Endpoint de login
router.post('/login', authController.login);

module.exports = router;
