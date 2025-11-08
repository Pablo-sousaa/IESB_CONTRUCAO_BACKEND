// Caminho: src/validators/ProjetoValidator.js

const yup = require('yup');

// Schema base para validação de data
const dateValidation = {
    data_inicio: yup.date().required('A data de início é obrigatória'),
    data_fim: yup.date()
        .required('A data de fim é obrigatória') 
        .min(yup.ref('data_inicio'), 'A data de fim deve ser posterior à data de início'),
};

// Schema para criação [cite: 164]
const createSchema = yup.object().shape({
    body: yup.object({
        nome: yup.string().required('O nome é obrigatório'),
        descricao: yup.string().required('A descrição é obrigatória'),
        ...dateValidation,
    }),
});

// Schema para atualização [cite: 165]
const updateSchema = yup.object().shape({
    body: yup.object({
        nome: yup.string().optional(),
        descricao: yup.string().optional(),
        data_inicio: yup.date().optional(),
        data_fim: yup.date()
            .optional()
            .when('data_inicio', (data_inicio, schema) => {
                 // Se data_inicio for fornecida, data_fim deve ser maior que ela
                return data_inicio ? schema.min(data_inicio[0], 'A data de fim deve ser posterior à data de início') : schema;
            }),
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