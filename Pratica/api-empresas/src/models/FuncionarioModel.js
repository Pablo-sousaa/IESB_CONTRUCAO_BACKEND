// Caminho: src/models/FuncionarioModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const funcionarioSchema = new Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true  },
    data_contratacao: { type: Date, required: true  },
    data_nascimento: { type: Date, required: true  },
    genero: { type: String, required: true },
    endereco: { // [cite: 31]
        cep: { type: String },
        logradouro: { type: String },
        numero: { type: String },
        complemento: { type: String },
        bairro: { type: String },
        cidade: { type: String },
        uf: { type: String },
    },
    cargo: { // [cite: 156-160]
        type: Schema.Types.ObjectId,
        ref: 'Cargos', // Referência ao Model 'Cargos'
        required: true 
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamentos', // Referência ao Model 'Departamentos'
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Funcionarios', funcionarioSchema);