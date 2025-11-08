const express = require('express');
const router = express.Router();
const Tarefa = require('../models/TarefaModel');
const { validarTarefa } = require('../validators/TarefaValidator');
const { validarID } = require('../validators/IDValidator');

router.post('/', validarTarefa, async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body);
    const populated = await Tarefa.findById(tarefa._id)
      .populate('responsavel', 'nome email')
      .populate('projeto', 'nome');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/', async (req, res) => {
  const tarefas = await Tarefa.find()
    .populate('responsavel', 'nome email')
    .populate('projeto', 'nome')
    .sort({ dataInicio: 1 });
  res.json(tarefas);
});

router.get('/:id', validarID, async (req, res) => {
  const tarefa = await Tarefa.findById(req.params.id)
    .populate('responsavel', 'nome email')
    .populate('projeto', 'nome');
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
});

router.put('/:id', validarID, validarTarefa, async (req, res) => {
  const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  const populated = await Tarefa.findById(tarefa._id)
    .populate('responsavel', 'nome email')
    .populate('projeto', 'nome');
  res.json(populated);
});

router.delete('/:id', validarID, async (req, res) => {
  const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json({ mensagem: 'Tarefa removida com sucesso' });
});

module.exports = router;