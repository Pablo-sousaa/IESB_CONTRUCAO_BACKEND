// Caminho: src/validators/IDValidator.js

const yup = require('yup');
const mongoose = require('mongoose');

// Validador para checar se um ID é um ObjectId válido do MongoDB [cite: 248]
const idValidator = (message) => {
    return yup.string().test({
        name: 'isValidMongoId',
        message: message || 'ID inválido',
        test: (value) => !value || mongoose.Types.ObjectId.isValid(value),
    });
};

// Schema de validação para parâmetros de rota :id
const paramsIdSchema = yup.object({
    params: yup.object({
        id: idValidator('ID de parâmetro inválido').required('O ID é obrigatório nos parâmetros'),
    }),
});

module.exports = { idValidator, paramsIdSchema };