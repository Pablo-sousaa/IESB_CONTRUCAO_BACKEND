const express = require('express');
const router = express.Router();
const Funcionario = require('../models/FuncionarioModel');
const { validarFuncionario } = require('../validators/FuncionarioValidator');
const { validarID } = require('../validators/IDValidator');

router.post('/', validarFuncionario, async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    const populated = await Funcionario.findById(funcionario._id)
      .populate('cargo', 'nome salario')
      .populate('departamento', 'nome');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/', async (req, res) => {
  const funcionarios = await Funcionario.find()
    .populate('cargo', 'nome salario')
    .populate('departamento', 'nome')
    .sort({ nome: 1 });
  res.json(funcionarios);
});

router.get('/:id', validarID, async (req, res) => {
  const funcionario = await Funcionario.findById(req.params.id)
    .populate('cargo', 'nome salario')
    .populate('departamento', 'nome');
  if (!funcionario) return res.status(404).json({ erro: 'Funcionário não encontrado' });
  res.json(funcionario);
});

router.put('/:id', validarID, validarFuncionario, async (req, res) => {
  const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  const populated = await Funcionario.findById(funcionario._id)
    .populate('cargo', 'nome salario')
    .populate('departamento', 'nome');
  res.json(populated);
});

router.delete('/:id', validarID, async (req, res) => {
  const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
  if (!funcionario) return res.status(404).json({ erro: 'Funcionário não encontrado' });
  res.json({ mensagem: 'Funcionário removido com sucesso' });
});

module.exports = router;