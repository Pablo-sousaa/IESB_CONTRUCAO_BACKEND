// importar o express

const express = require ('express')

// criar uma instância do backend com o express 

const app = express ()

// intermediários (middlewares)
// Intermediário de log
//toda requisição vai passar por ele e imprimir no terminal informações da requisição
app.use((req,res,next) => {
    console.log("time: ", new Date ().toLocaleString())
    console.log("Metodo: ", req.method)
    console.log ("Rota: ", req.url)
    next()
})
// Hello World
// req > a requisição (os dados da requisição)
// res > manipulador da resposta
// next > chama próximo intermediário
// mapeamento da requisição
app.get('/hello', (req, res, next) => {
    // envio a resposta
    res.send("Hello World !!!")
})

app.get ('/pessoas', (req, res, next) => {
    const pessoas = [
        {
            id:1,
            nome:"João Pedro",
        },

        {
            id:2,
            nome:"Joninha"
        }
        
    ]
    res.json(pessoas)
})

app.get('/')





// executar a aplicação escolhendo a porta que ela vai escutar
app.listen (3000), () => {
    console.log ("Minha aplicação está rodando em http://localhost:3000")
}

