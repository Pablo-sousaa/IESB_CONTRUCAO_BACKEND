const mongoose = require('mongoose');
const yup = require('yup');

const schema = yup.object().shape({
  id: yup.string()
    .test('id-validator', 'ID inválido', value => mongoose.Types.ObjectId.isValid(value))
});

async function validarID(req, res, next) {
  try {
    await schema.validate({ id: req.params.id }, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarID };