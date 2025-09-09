const express = require ('express')

const app = express ()

const cors = require('cors')
//habilita chegar requisição de qualquer origem
app.use(cors())

app.use((req,res,next) => {

    console.log("----###### requisição chegou ######----")
    console.log("Time:", new Date().toLocaleString)
    console.log("Método:", req.method)
    console.log("Rota", req.url)
    next()
})


app.get("/hello", (req,res,next) => {
    res.send("Hello!!!")
})


const calculadoraNotaRouter = require('./routes/CalculadoraNota')

app.use("/", calculadoraNotaRouter)








app.listen(3000, () => {
    console.log ("API rodando em http://localhost:3000")
})