const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool


// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }

        conn.query(`SELECT pedidos.idPedido, pedidos.quantidade, produto.idProduto, produto.nome, produto.preco 
        FROM pedidos INNER JOIN produto 
        ON produto.idProduto = pedidos.idProduto`, 
            (error, result, fields) => {
            if(error){
                return res.status(500).send({
                    error: error
                })
            }
            const response = {
                quantidadeRegistros: result.length,
                pedidos: result.map(pedido => {
                    return{
                        idPedido: pedido.idPedido,
                        produto: {
                            idProduto: pedido.idProduto,
                            nome: pedido.nome,
                            preco: pedido.preco
                        },
                        quantidade: pedido.quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um pedido específico',
                            url: 'http://localhost:3008/pedidos/' + pedido.idPedido 
                        }
                    }
                })
            }

            return res.status(200).send({response})
        })
    })
})

//INSERE UM PEDIDOS
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }

        conn.query('SELECT * FROM produto WHERE idProduto = ?', [req.body.idProduto], (error, result, fields) => {
            if(error){
                return res.status(500).send({
                    error: error
                })
            }
            if(result.length == 0){
                return res.status(404).send({
                    mensagem: "Não foi encontrado produto com esse ID"
                })
            }

            conn.query('INSERT INTO pedidos (idProduto, quantidade) VALUES (?, ?)', [req.body.idProduto, req.body.quantidade], (error, result, fields) => {
                conn.release();
    
                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'Pedido inserido com sucesso',
                    pedidoCriado: {
                        idPedido: result.idPedido,
                        idProduto: req.body.idProduto,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3008/produtos'
                        }
                    }
                }
                
                return res.status(201).send({response})
            })
        })
    })
})

//RETORNA OS DADOS DE UM PEDIDOS
router.get('/:idPedido', (req, res, next) => {      
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }

        conn.query('SELECT * FROM pedidos WHERE idPedido = ?', [req.params.idPedido], (error, result, fields) => {
            if(error){
                return res.status(500).send({
                    error: error
                })
            }

            if(result.length == 0){
                return res.status(404).send({
                    mensagem: "Não foi encontrado pedido com esse ID"
                })
            }

            const response = {
                pedido: {
                    idPedido: result[0].idPedido,
                    idProduto: result[0].idProduto,
                    quantidade: result[0].quantidade,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os pesidos',
                        url: 'http://localhost:3008/pedidos/'
                    }
                }
            }

            return res.status(200).send({response})
        })
    })    
})

//DELETA UM PEDIDO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        
        conn.query('DELETE FROM pedidos WHERE idPedido = ?', [req.body.idPedido], (error, result, fields) => {
            conn.release();

            if(error){
                return res.status(500).send({
                    error: error,
                    response: null
                })
            }

            const response = {
                mensagem: "Pedido removido com sucesso",
                request: {
                    tipo: 'POST',
                    descricao: "Insere um pedido novo",
                    url: "http://localhost:3008/pedidos",
                    body: {
                        idProduto: 'Number',
                        quantidade: 'Number'
                    }
                }
            }

            return res.status(202).send(response)
        })
    })
})

module.exports = router;