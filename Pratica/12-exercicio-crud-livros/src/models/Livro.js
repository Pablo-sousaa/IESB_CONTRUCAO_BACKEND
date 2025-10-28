// src/models/Livro.js
const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true // 
        },
        autor: {
            type: String,
            required: true // 
        },
        editora: {
            type: String,
            required: true // 
        },
        ano: {
            type: Number,
            required: true // 
        },
        preco: {
            type: Number,
            required: true // 
        }
    },
    {
        // Adiciona os campos createdAt e updatedAt automaticamente
        timestamps: true 
    }
);

// Exporta o model
module.exports = mongoose.model('Livro', LivroSchema);