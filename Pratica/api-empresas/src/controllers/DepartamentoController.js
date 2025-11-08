// Caminho: src/controllers/DepartamentoController.js

const express = require('express');
const router = express.Router();
const DepartamentoModel = require('../models/DepartamentoModel');
const DepartamentoValidator = require('../validators/DepartamentoValidator');
const { paramsIdSchema } = require('../validators/IDValidator');
const { validate } = require('yup'); // Usado para validar o paramsIdSchema

// Middleware genérico para validar ID nos parâmetros [cite: 246]
const validateIdParam = async (req, res, next) => {
    try {
        await paramsIdSchema.validate({ params: req.params }, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

// POST - Criar [cite: 173]
router.post('/', DepartamentoValidator.validateCreate, async (req, res) => {
    try {
        const novoDepartamento = new DepartamentoModel(req.body);
        await novoDepartamento.save();
        res.status(201).json(novoDepartamento); // [cite: 258]
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Listar todos [cite: 174]
router.get('/', async (req, res) => {
    try {
        const departamentos = await DepartamentoModel.find();
        res.status(200).json(departamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Buscar por ID [cite: 177]
router.get('/:id', validateIdParam, async (req, res) => {
    try {
        const departamento = await DepartamentoModel.findById(req.params.id);
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento não encontrado' }); // [cite: 258]
        }
        res.status(200).json(departamento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Atualizar [cite: 179]
router.put('/:id', validateIdParam, DepartamentoValidator.validateUpdate, async (req, res) => {
    try {
        const departamento = await DepartamentoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento não encontrado' });
        }
        res.status(200).json(departamento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Remover [cite: 181]
router.delete('/:id', validateIdParam, async (req, res) => {
    try {
        const departamento = await DepartamentoModel.findByIdAndDelete(req.params.id);
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento não encontrado' });
        }
        res.status(200).json({ message: 'Departamento removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;