// Caminho: src/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Importação dos Controllers (será preenchido nos próximos passos)
const DepartamentoController = require('./controllers/DepartamentoController');
const CargoController = require('./controllers/CargoController');
const ProjetoController = require('./controllers/ProjetoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const TarefaController = require('./controllers/TarefaController');

// Definição das Rotas
app.use('/departamentos', DepartamentoController);
app.use('/cargos', CargoController);
app.use('/projetos', ProjetoController);
app.use('/funcionarios', FuncionarioController);
app.use('/tarefas', TarefaController);


// Conexão com o MongoDB Atlas
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao MongoDB Atlas!');
        // Inicia o servidor
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });