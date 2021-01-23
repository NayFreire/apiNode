const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool

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
        mensagem: 'Retorna todos os produtos',
        resultado: produtos
    })
})

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    // const produto = {
    //     nome: req.body.nome,
    //     preco : req.body.preco
    // }

    mysql.getConnection((error, conn) => {
        conn.query('INSERT INTO produto (nome, preco) VALUES (?, ?)', [req.body.nome, req.body.preco], (error, resultado, fields) => {
            // conn.release();

            if(error){
                return res.status(500).send({
                    error: error,
                    response: null
                })
            }

            res.status(201).send({
                mensagem: 'Produto inserido com sucesso',
                idProduto: resultado.insertId //Retorna o id do produto que acabou de ser inserido
            })
        })
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

//ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto alterado'
    })
})

//DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto deletado'
    })
})

module.exports = router;