const express = require('express');
const router = express.Router();
const Cargo = require('../models/CargoModel');
const { validarCargo } = require('../validators/CargoValidator');
const { validarID } = require('../validators/IDValidator');

router.post('/', validarCargo, async (req, res) => {
  try {
    const cargo = await Cargo.create(req.body);
    res.status(201).json(cargo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/', async (req, res) => {
  const cargos = await Cargo.find().sort({ nome: 1 });
  res.json(cargos);
});

router.get('/:id', validarID, async (req, res) => {
  const cargo = await Cargo.findById(req.params.id);
  if (!cargo) return res.status(404).json({ erro: 'Cargo não encontrado' });
  res.json(cargo);
});

router.put('/:id', validarID, validarCargo, async (req, res) => {
  const cargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!cargo) return res.status(404).json({ erro: 'Cargo não encontrado' });
  res.json(cargo);
});

router.delete('/:id', validarID, async (req, res) => {
  const cargo = await Cargo.findByIdAndDelete(req.params.id);
  if (!cargo) return res.status(404).json({ erro: 'Cargo não encontrado' });
  res.json({ mensagem: 'Cargo removido com sucesso' });
});

module.exports = router;