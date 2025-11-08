// Caminho: src/controllers/CargoController.js

const express = require('express');
const router = express.Router();
const CargoModel = require('../models/CargoModel');
const CargoValidator = require('../validators/CargoValidator');
const { paramsIdSchema } = require('../validators/IDValidator');

// Middleware genérico para validar ID nos parâmetros
const validateIdParam = async (req, res, next) => {
    try {
        await paramsIdSchema.validate({ params: req.params }, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

// POST - Criar [cite: 173]
router.post('/', CargoValidator.validateCreate, async (req, res) => {
    try {
        const novoCargo = new CargoModel(req.body);
        await novoCargo.save();
        res.status(201).json(novoCargo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Listar todos [cite: 174]
router.get('/', async (req, res) => {
    try {
        const cargos = await CargoModel.find();
        res.status(200).json(cargos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Buscar por ID [cite: 177]
router.get('/:id', validateIdParam, async (req, res) => {
    try {
        const cargo = await CargoModel.findById(req.params.id);
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo não encontrado' });
        }
        res.status(200).json(cargo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Atualizar [cite: 179]
router.put('/:id', validateIdParam, CargoValidator.validateUpdate, async (req, res) => {
    try {
        const cargo = await CargoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo não encontrado' });
        }
        res.status(200).json(cargo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Remover [cite: 181]
router.delete('/:id', validateIdParam, async (req, res) => {
    try {
        const cargo = await CargoModel.findByIdAndDelete(req.params.id);
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo não encontrado' });
        }
        res.status(200).json({ message: 'Cargo removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;