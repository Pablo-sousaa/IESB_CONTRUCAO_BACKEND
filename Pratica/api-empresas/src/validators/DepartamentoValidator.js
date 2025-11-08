// Caminho: src/validators/DepartamentoValidator.js

const yup = require('yup');

// Schema para criação [cite: 164]
const createSchema = yup.object().shape({
    body: yup.object({
        nome: yup.string().required('O nome é obrigatório'),
        descricao: yup.string().required('A descrição é obrigatória'),
    }),
});

// Schema para atualização [cite: 165]
const updateSchema = yup.object().shape({
    body: yup.object({
        nome: yup.string().optional(),
        descricao: yup.string().optional(),
    }),
});

// Middleware de validação
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req, { abortEarly: false }); // [cite: 249]
        next();
    } catch (error) {
        res.status(400).json({ // [cite: 258]
            errors: error.errors 
        });
};
}

module.exports = {
    validateCreate: validate(createSchema),
    validateUpdate: validate(updateSchema)
}