const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool
const bcrypt = require('bcrypt')

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if(err){
            return res.status(500).send({
                error: error
            })
        }

        conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (error, results) => {
            if(error){
                return res.status(500).send({
                    error: error
                })
            }

            if(results.length > 0){
                return res.status(409).send({
                    mensagem: "usuário já cadastrado com esse email"
                })
            }
            else{
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if(errBcrypt){
                        return res.status(500).send({
                            error: errBcrypt
                        })
                    }
                    conn.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [req.body.email, hash], (error, results) => {
                        conn.release()
                        if(error){
                            return res.status(500).send({
                                error: error
                            })
                        }
        
                        const response = {
                            mensagem: "Usuário criado com sucesso",
                            usuarioCriado: {
                                idUsuarios: results.insertId,
                                email: req.body.email
                            }
                        }
        
                        return res.status(201).send(response)
                    })
                })
            }
        })

    })
})

module.exports = router
