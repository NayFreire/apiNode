const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }

        conn.query('SELECT * FROM produto', (error, resultado, fields) => {
            if(error){
                return res.status(500).send({
                    error: error
                })
            }

            return res.status(200).send({
                response: resultado
            })
        })
    })
})

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        
        conn.query('INSERT INTO produto (nome, preco) VALUES (?, ?)', [req.body.nome, req.body.preco], (error, resultado, fields) => {
            conn.release();

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
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }

        conn.query('SELECT * FROM produto WHERE idProduto = ?', [req.params.idProduto], (error, resultado, fields) => {
            if(error){
                return res.status(500).send({
                    error: error
                })
            }

            return res.status(200).send({
                response: resultado
            })
        })
    })

    
})

//ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        
        conn.query('UPDATE produto SET nome = ?, preco = ? WHERE idProduto = ?', [req.body.nome, req.body.preco, req.body.idProduto], (error, resultado, fields) => {
            conn.release();

            if(error){
                return res.status(500).send({
                    error: error,
                    response: null
                })
            }

            res.status(202).send({
                mensagem: 'Produto alterado com sucesso'
            })
        })
    })
})

//DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        
        conn.query('DELETE FROM produto WHERE idProduto = ?', [req.body.idProduto], (error, resultado, fields) => {
            conn.release();

            if(error){
                return res.status(500).send({
                    error: error,
                    response: null
                })
            }

            res.status(202).send({
                mensagem: 'Produto deletado com sucesso',
                idProduto: resultado.insertId //Retorna o id do produto que acabou de ser inserido
            })
        })
    })
})

module.exports = router;