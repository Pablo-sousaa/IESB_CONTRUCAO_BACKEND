const express = require ('express')
const app = express ()

//intermediários
const cors = require ('cors')
// habilitar o browser para mandar uma requisição
app.use(cors())
// habilita receber json como corpo da requisição
app.use(express.json())

app.use((req, res, next) => {
    console.log("----## Log da Requisição ##----")
    console.log("Time: ", new Date().toLocaleString())
    console.log("Metodo: ", req.method)
    console.log("Rota ", req.url)
    next()
})

//roteadores
const PessoaController = require('./routes/PessoaController')
app.use(PessoaController)

// executa
app.listen(3000, () => {
    console.log("API rodando em http://localhost:3000")
})