const db = require('../models/db'); // Conexão com o banco de dados

// Função para listar todos os cursos
exports.getCourses = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar cursos' });
    }
};

// Função para obter um curso específico
exports.getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM courses WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar curso' });
    }
};
