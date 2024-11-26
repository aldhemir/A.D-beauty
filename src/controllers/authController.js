const bcrypt = require('bcryptjs');  // Ou 'bcrypt', se preferir
const db = require('../models/db');  // Conexão com o banco de dados

// Função de login
exports.login = async (req, res) => {
    const { username, password } = req.body;  // Coleta os dados de username e password

    try {
        // Busca o usuário pelo nome de usuário
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        // Se o usuário não for encontrado, retorna erro
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const user = result.rows[0];  // Recupera o usuário encontrado

        // Verifica a senha fornecida com a senha criptografada no banco
        const isMatch = await bcrypt.compare(password, user.password);

        // Se a senha não for válida, retorna erro
        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Armazena informações do usuário na sessão
        req.session.userId = user.id;
        req.session.username = user.username;

        return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (err) {
        console.error("Erro no login:", err);  // Log de erro detalhado
        res.status(500).json({ error: `Erro no servidor: ${err.message}` });  // Passa o erro específico para a resposta
    }
};

// Função para verificar se o usuário está autenticado
exports.isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(403).json({ message: 'Você precisa estar logado' });
    }
    next();  // Continua para a próxima etapa se o usuário estiver logado
};
