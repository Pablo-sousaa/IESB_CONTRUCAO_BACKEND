const express = require ('express')
const router = express.Router()

// mapeamento dos endpoints e a lógica
// lista de pessoa para simular ban co de dados
 
let pessoas = [
    
{
    id: 1, 
    nome: "Pablo",
    cpf:"0000000081",
    dataNascimento:"24/12/03"
},
{
    id: 2, 
    nome: "Ana",
    cpf:"00000000001",
    dataNascimento:"30/03/04"
}
]
//criar
// post/alunos (enviar algo)

router.post('/pessoas', (req,res,next) => {

})

//listar 
// get/alunos (busca uma informação)

router.get('/pessoas', (req, res, next) => {
    res.json (pessoas);
})

//buscar 
// get/alunos/{id} (busca específica necessita do identificador daquele objeto a ser buscado)

router.get('/pessoas/:id', (req, res, next) => {
const idRecebido = req.params.id
//find percorre o array e traz o valor que você pediu na comparação
 const pessoa = pessoas.find( p => p.id ==idRecebido)
 if(!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada!!!"})
 }
 res.json(pessoa)
})

//editar = put/alunos/{id} (usado pra criar um novo recurso ou editar um já existente)

router.put('/pessoas/:id', (req, res, next) => {

})


//deletar = delete/alunos/{id} 

router.delete('/pessoas/:id', (req,res,next) => {

})


module.exports = router




