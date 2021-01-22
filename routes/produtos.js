const express = require('express');
const { route } = require('../app');
const router = express.Router();


// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    let produtos = [
        {
            id: 1,
            nome: 'alface',
            especificacao: 'lisa',
            qtd: 30
        },
        {
            id: 2,
            nome: 'repolho',
            especificacao: 'roxo',
            qtd: 0
        },
        {
            id: 3,
            nome: 'manga',
            especificacao: 'tomy',
            qtd: 60
        }
    ]
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos',
        resultado: produtos
    })
})

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de produtos'
    })
})

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:idProduto', (req, res, next) => {
    const id = req.params.idProduto

    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'Você descobriu o id especial',
            id: id
        })
    }
    else{
        res.status(200).send({
            mensagem: 'Você passou um id',
        })
    }

    
})

route.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de produtos'
    })
})

route.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de produtos'
    })
})

module.exports = router;