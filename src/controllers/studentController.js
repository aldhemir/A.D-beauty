const db = require('../models/db'); // Conexão com o banco de dados

// Função para listar todos os alunos de um curso
exports.getStudentsByCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const result = await db.query('SELECT * FROM students WHERE course_id = $1', [courseId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar alunos' });
    }
};

// Função para adicionar um novo aluno
exports.addStudent = async (req, res) => {
    const { nome, sobrenome, telefone, data_nascimento, cpf, email, curso, data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO students (nome, sobrenome, telefone, data_nascimento, cpf, email, curso, data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [nome, sobrenome, telefone, data_nascimento, cpf, email, curso, data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar aluno' });
    }
};

// Função para editar os dados de um aluno
exports.editStudent = async (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, telefone, data_nascimento, cpf, email, curso, data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao } = req.body;

    try {
        const result = await db.query(
            'UPDATE students SET nome = $1, sobrenome = $2, telefone = $3, data_nascimento = $4, cpf = $5, email = $6, curso = $7, data_curso = $8, sinal = $9, valor = $10, presente = $11, vendedora = $12, formas_pagamento = $13, observacao = $14 WHERE id = $15 RETURNING *',
            [nome, sobrenome, telefone, data_nascimento, cpf, email, curso, data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao editar aluno' });
    }
};

// Função para excluir um aluno
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir aluno' });
    }
};
