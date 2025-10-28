// src/validators/IDValidator.js
const mongoose = require('mongoose');

/**
 * Middleware para validar se o ID na rota é um ObjectId válido do Mongoose.
 */
const IDValidator = (req, res, next) => {
    const { id } = req.params;

    // [cite: 47]
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "O ID informado não é válido."
        });
    }

    next();
};

module.exports = IDValidator;