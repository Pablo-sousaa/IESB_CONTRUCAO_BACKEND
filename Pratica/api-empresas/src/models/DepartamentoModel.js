// Caminho: src/models/DepartamentoModel.js

const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true 
    },
    descricao: {
        type: String,
        required: true
    }
}, { timestamps: true }); // [cite: 252]

module.exports = mongoose.model('Departamentos', departamentoSchema);