const yup = require('yup');

const schema = yup.object().shape({
  nome: yup.string().required("nome é obrigatório"),
  descricao: yup.string().required("descricao é obrigatório")
});

async function validarDepartamento(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarDepartamento };