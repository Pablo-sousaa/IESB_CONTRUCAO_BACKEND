const express = require('express');
const router = express.Router();
const Departamento = require('../models/DepartamentoModel');
const { validarDepartamento } = require('../validators/DepartamentoValidator');
const { validarID } = require('../validators/IDValidator');

router.post('/', validarDepartamento, async (req, res) => {
  try {
    const departamento = await Departamento.create(req.body);
    res.status(201).json(departamento);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/', async (req, res) => {
  const departamentos = await Departamento.find().sort({ nome: 1 });
  res.json(departamentos);
});

router.get('/:id', validarID, async (req, res) => {
  const departamento = await Departamento.findById(req.params.id);
  if (!departamento) return res.status(404).json({ erro: 'Departamento não encontrado' });
  res.json(departamento);
});

router.put('/:id', validarID, validarDepartamento, async (req, res) => {
  const departamento = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!departamento) return res.status(404).json({ erro: 'Departamento não encontrado' });
  res.json(departamento);
});

router.delete('/:id', validarID, async (req, res) => {
  const departamento = await Departamento.findByIdAndDelete(req.params.id);
  if (!departamento) return res.status(404).json({ erro: 'Departamento não encontrado' });
  res.json({ mensagem: 'Departamento removido com sucesso' });
});

module.exports = router;