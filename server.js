const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');  // Importando express-session
const routes = require('./src/routes'); // Importação das rotas principais

const app = express();

// Configurações gerais
app.use(cors());
app.use(bodyParser.json()); // Para receber JSON no corpo das requisições

// Configuração da sessão
app.use(session({
    secret: 'seuSegredoAqui',  // Troque isso por um segredo forte
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Defina como true se usar HTTPS
}));

// Rotas
app.use('/api', routes); // Todas as rotas estarão no prefixo `/api`

// Erro padrão para rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Erro geral do servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
