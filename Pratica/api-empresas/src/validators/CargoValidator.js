// Caminho: src/validators/CargoValidator.js

const yup = require('yup');

// Schema para criação [cite: 164]
const createSchema = yup.object().shape({
    body: yup.object({
        nome: yup.string().required('O nome é obrigatório'),
        descricao: yup.string().required('A descrição é obrigatória'),
        salario: yup.number()
            .required('O salário é obrigatório'),
            .min(1518, 'O salário mínimo é R$ 1.518,00'),
    }),
});

// Schema para atualização [cite: 165]
const updateSchema = yup.object().shape({
    body: yup.object({
        nome: yup.string().optional(),
        descricao: yup.string().optional(),
        salario: yup.number()
            .optional()
            .min(1518, 'O salário mínimo é R$ 1.518,00'),
    }),
});

// Middleware de validação
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req, { abortEarly: false }); 
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

module.exports = {
    validateCreate: validate(createSchema),
    validateUpdate: validate(updateSchema)
};