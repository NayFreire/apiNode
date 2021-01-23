const express = require('express')
const app = express();

const rotaProdutos = require('./routes/produtos')
const rotasPedidos = require('./routes/pedidos')



app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotasPedidos);


module.exports = app;