//Admin é quem pode adicionar, editar, deletar e listar todos os usuários

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';    

module.exports = {

    async add(req, res) {
        const {
            username,
            password: plainTextPassword,
            admin
        } = req.body

        if (!username || typeof username !== 'string') {
            return res.json({
                status: 'error',
                error: 'Usuário não encontrado'
            })
        }

        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({
                status: 'error',
                error: 'Senha incorreta'
            })
        }

        if (plainTextPassword.length < 6) {
            return res.json({
                status: 'error',
                error: 'Sua senha precisa ter pelo menos 6 caracteres'
            })
        }

        const password = await bcrypt.hash(plainTextPassword, 10)

        try {
            const response = await User.create({
                username,
                password,
                admin
            })
            console.log('Usuário criado com sucesso!', response)
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({
                    status: 'error',
                    error: 'Este nome de usuário já existe'
                })
            }
            throw error
        }

        res.json({
            status: 'ok'
        })
    },


    async apagar (req,res) {
        const CheckUser = await User.findOne({_id: req.params.id}).lean();

        if (!CheckUser) {
            return res.status(401).json({error: "Usuário não encontrado"})
        }
    
        var user = await User.findByIdAndDelete(
            req.params.id
        )

        res.json({
            status: 'Usuário removido!'
        })

    },

    //utilizado para mudar um usuário normal para admin e vice versa
    async editar (req,res) {
        const CheckUser = await User.findOne({_id: req.params.id}).lean();
        const dadosuser = req.body


        if (!CheckUser) {
            return res.status(401).json({error: "Usuário não encontrado"})
        }

            await User.updateOne ({ "_id": CheckUser._id }, {"$set":{
                "admin": dadosuser.admin
            }})
            
        res.json({
            status: 'Usuário atualizado com sucesso!'
        })

    },

    async listar (req,res) {
        const users = await User.find();
        res.json(users)

    }
}