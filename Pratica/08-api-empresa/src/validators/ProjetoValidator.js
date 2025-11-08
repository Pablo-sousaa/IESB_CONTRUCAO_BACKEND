const yup = require('yup');

const schema = yup.object().shape({
  nome: yup.string().required("nome é obrigatório"),
  descricao: yup.string().required("descricao é obrigatório"),
  dataInicio: yup.date().required("dataInicio é obrigatório"),
  dataFim: yup.date().required("dataFim é obrigatório")
    .test('after-start', 'dataFim deve ser posterior à dataInicio', function(value) {
      return value > this.parent.dataInicio;
    })
});

async function validarProjeto(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarProjeto };