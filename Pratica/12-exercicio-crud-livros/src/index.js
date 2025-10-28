// src/index.js
require('dotenv').config(); // Carrega as variáveis do .env

const express = require('express');
const mongoose = require('mongoose');

// Importando o controller
const LivroController = require('./controllers/LivroController'); // 

// --- Configuração do Aplicativo ---
const app = express();
app.use(express.json()); // Permite que o Express entenda JSON 

// --- Configuração do Banco de Dados (MongoDB Atlas) --- 
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

// String de conexão
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURL)
    .then(() => {
        console.log("MongoDB Atlas Conectado com Sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB Atlas:", error.message);
        process.exit(1); // Encerra a aplicação se a conexão falhar
    });

// --- Rotas ---
// Rota principal (apenas para teste)
app.get('/', (req, res) => {
    res.json({ message: "Bem-vindo à API de Livros" });
});

// Utiliza as rotas do LivroController
// (Seguindo o padrão do 'crud-pessoas', prefixamos com /api)
app.use('/api', LivroController); // 

// --- Iniciando o Servidor ---
const PORT = process.env.PORT || 3000; // 
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT}`);
});