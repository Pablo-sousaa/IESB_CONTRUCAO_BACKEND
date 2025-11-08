require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const departamentoRoutes = require('./controllers/DepartamentoController');
const cargoRoutes = require('./controllers/CargoController');
const funcionarioRoutes = require('./controllers/FuncionarioController');
const projetoRoutes = require('./controllers/ProjetoController');
const tarefaRoutes = require('./controllers/TarefaController');

const app = express();
app.use(express.json());

const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('Erro ao conectar:', err);
    process.exit(1);
  });

app.use('/departamentos', departamentoRoutes);
app.use('/cargos', cargoRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/projetos', projetoRoutes);
app.use('/tarefas', tarefaRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));