// Caminho: src/controllers/ProjetoController.js

const express = require('express');
const router = express.Router();
const ProjetoModel = require('../models/ProjetoModel');
const ProjetoValidator = require('../validators/ProjetoValidator');
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
router.post('/', ProjetoValidator.validateCreate, async (req, res) => {
    try {
        const novoProjeto = new ProjetoModel(req.body);
        await novoProjeto.save();
        res.status(201).json(novoProjeto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Listar todos [cite: 174]
router.get('/', async (req, res) => {
    try {
        const projetos = await ProjetoModel.find();
        res.status(200).json(projetos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Buscar por ID [cite: 177]
router.get('/:id', validateIdParam, async (req, res) => {
    try {
        const projeto = await ProjetoModel.findById(req.params.id);
        if (!projeto) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        res.status(200).json(projeto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Atualizar [cite: 179]
router.put('/:id', validateIdParam, ProjetoValidator.validateUpdate, async (req, res) => {
    try {
        const projeto = await ProjetoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!projeto) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        res.status(200).json(projeto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Remover [cite: 181]
router.delete('/:id', validateIdParam, async (req, res) => {
    try {
        const projeto = await ProjetoModel.findByIdAndDelete(req.params.id);
        if (!projeto) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        res.status(200).json({ message: 'Projeto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;