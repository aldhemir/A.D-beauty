const { Pool } = require('pg');

// Configuração da conexão com o banco de dados
const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

// Função para consultar o banco de dados
module.exports.query = (text, params) => pool.query(text, params);
