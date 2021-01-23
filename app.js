const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')

const rotaProdutos = require('./routes/produtos')
const rotasPedidos = require('./routes/pedidos')

app.use(morgan('dev')) //Morgan trás um log do tipo de request que foi realizado: se eu pedi um get, no terminal, aparece 'GET /rota número_do_status tempo'
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotasPedidos);

//QUANDO NENHUMA ROTA É ENCONTRADA, ENTRA AQUI
app.use((req, res, next) => {
    const erro = new Error('Não encontrado') //SETANDO O ERRO COMO NÃO ENCONTRADO
    erro.status = 404 //SETANDO O STATUS CODE COMO 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500) //SETANDO O STATUS PARA O STATUS DO ERRO OU 500
    return res.send({ //
        erro: {
            mensagem: error.message,
            errno: error.status
        }
    })
})

module.exports = app;