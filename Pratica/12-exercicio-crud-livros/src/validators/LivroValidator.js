// src/validators/LivroValidator.js
const yup = require('yup');

// Schema para criar um novo livro (todos os campos obrigatórios) 
const createSchema = yup.object().shape({
    titulo: yup.string().required("O campo 'titulo' é obrigatório"),
    autor: yup.string().required("O campo 'autor' é obrigatório"),
    editora: yup.string().required("O campo 'editora' é obrigatória"),
    ano: yup.number()
        .typeError("O campo 'ano' deve ser um número") // 
        .integer("O campo 'ano' deve ser um número inteiro")
        .required("O campo 'ano' é obrigatório"),
    preco: yup.number()
        .typeError("O campo 'preco' deve ser um número")
        .positive("O campo 'preco' deve ser um número positivo") // 
        .required("O campo 'preco' é obrigatório")
});

// Schema para atualizar um livro (campos opcionais) 
const updateSchema = yup.object().shape({
    titulo: yup.string(),
    autor: yup.string(),
    editora: yup.string(),
    ano: yup.number()
        .typeError("O campo 'ano' deve ser um número") // 
        .integer("O campo 'ano' deve ser um número inteiro"),
    preco: yup.number()
        .typeError("O campo 'preco' deve ser um número")
        .positive("O campo 'preco' deve ser um número positivo") // 
});


/**
 * Middleware genérico de validação que utiliza um schema do Yup.
 * [cite: 51]
 */
const validate = (schema) => async (req, res, next) => {
    try {
        // Valida o corpo da requisição com o schema e { abortEarly: false } 
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        // Captura os erros de validação do Yup
        if (error instanceof yup.ValidationError) {
            const validationErrors = error.inner.reduce((acc, err) => {
                acc[err.path] = err.message;
                return acc;
            }, {});

            return res.status(400).json({
                message: "Erro na validação dos dados",
                errors: validationErrors
            });
        }
        // Outros erros
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    validateCreate: validate(createSchema),
    validateUpdate: validate(updateSchema)
};