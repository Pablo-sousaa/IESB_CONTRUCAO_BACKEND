// src/controllers/LivroController.js
const { Router } = require('express');
const Livro = require('../models/Livro');

// Importando os validadores
const IDValidator = require('../validators/IDValidator');
const { validateCreate, validateUpdate } = require('../validators/LivroValidator');

const router = Router(); // 

// --- Rotas do CRUD ---

// POST /livros: Criar um novo livro
// Aplicar validação de novo livro 
router.post('/livros', validateCreate, async (req, res) => {
    try {
        const novoLivro = new Livro(req.body);
        const livroSalvo = await novoLivro.save();
        res.status(201).json(livroSalvo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar livro", error: error.message });
    }
});

// GET /livros: Listar todos os livros 
router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar livros", error: error.message });
    }
});

// GET /livros/:id: Buscar livro por ID
// Aplicar validação de ID 
router.get('/livros/:id', IDValidator, async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await Livro.findById(id);

        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar livro", error: error.message });
    }
});

// PUT /livros/:id: Atualizar um livro
// Aplicar validação de ID e validação de atualização 
router.put('/livros/:id', IDValidator, validateUpdate, async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizacao = req.body;

        // { new: true } retorna o documento atualizado
        const livroAtualizado = await Livro.findByIdAndUpdate(id, dadosAtualizacao, { new: true });

        if (!livroAtualizado) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.status(200).json(livroAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar livro", error: error.message });
    }
});

// DELETE /livros/:id: Remover um livro
// Aplicar validação de ID 
router.delete('/livros/:id', IDValidator, async (req, res) => {
    try {
        const { id } = req.params;
        const livroRemovido = await Livro.findByIdAndDelete(id);

        if (!livroRemovido) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.status(200).json({ 
            message: "Livro removido com sucesso", 
            data: livroRemovido 
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover livro", error: error.message });
    }
});


module.exports = router; 