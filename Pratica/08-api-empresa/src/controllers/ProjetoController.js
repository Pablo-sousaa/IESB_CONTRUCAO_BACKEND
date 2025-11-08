const express = require('express');
const router = express.Router();
const Projeto = require('../models/ProjetoModel');
const { validarProjeto } = require('../validators/ProjetoValidator');
const { validarID } = require('../validators/IDValidator');

router.post('/', validarProjeto, async (req, res) => {
  try {
    const projeto = await Projeto.create(req.body);
    res.status(201).json(projeto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/', async (req, res) => {
  const projetos = await Projeto.find().sort({ nome: 1 });
  res.json(projetos);
});

router.get('/:id', validarID, async (req, res) => {
  const projeto = await Projeto.findById(req.params.id);
  if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(projeto);
});

router.put('/:id', validarID, validarProjeto, async (req, res) => {
  const projeto = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json(projeto);
});

router.delete('/:id', validarID, async (req, res) => {
  const projeto = await Projeto.findByIdAndDelete(req.params.id);
  if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
  res.json({ mensagem: 'Projeto removido com sucesso' });
});

module.exports = router;