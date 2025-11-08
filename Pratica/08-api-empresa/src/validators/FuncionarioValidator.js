const yup = require('yup');
const mongoose = require('mongoose');

const schema = yup.object().shape({
  nome: yup.string().required("nome é obrigatório"),
  cpf: yup.string().required("cpf é obrigatório"),
  email: yup.string().email("email inválido").required("email é obrigatório"),
  telefone: yup.string().required("telefone é obrigatório"),
  dataNascimento: yup.date().required("dataNascimento é obrigatório"),
  dataContratacao: yup.date().required("dataContratacao é obrigatório"),
  genero: yup.string().required("genero é obrigatório"),
  endereco: yup.object().optional(),
  cargo: yup.string().required("cargo é obrigatório")
    .test('id-validator', 'ID do cargo é inválido', value => mongoose.Types.ObjectId.isValid(value)),
  departamento: yup.string().required("departamento é obrigatório")
    .test('id-validator', 'ID do departamento é inválido', value => mongoose.Types.ObjectId.isValid(value))
});

async function validarFuncionario(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarFuncionario };