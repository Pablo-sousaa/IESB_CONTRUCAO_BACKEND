require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

// Conex達o com o MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Schema do Livro
const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true }
});

const livro = mongoose.model('livro', livroSchema);

// Endpoint para criar um livro (CREATE)
app.post('/livro', async (req, res) => {
  try {
    const livro = new livro(req.body);
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para listar todos os livros (READ - all)
app.get('/livro', async (req, res) => {
  try {
    const livro = await livro.find();
    res.json(livro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para buscar um livro por ID (READ - by id)
app.get('/livro/:id', async (req, res) => {
  try {
    const livro = await livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para atualizar um livro por ID (UPDATE)
app.put('/livro/:id', async (req, res) => {
  try {
    const livro = await livro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!livro) return res.status(404).json({ message: 'Livro n達o encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para remover um livro por ID (DELETE)
app.delete('/livro/:id', async (req, res) => {
  try {
    const livro = await livro.findByIdAndDelete(req.params.id);
    if (!livro) return res.status(404).json({ message: 'Livro n達o encontrado' });
    res.json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});