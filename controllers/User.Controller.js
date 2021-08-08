import User from '../models/user';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


module.exports = {
    async add(req, res) {
        const {
            username,
            password: plainTextPassword
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

        if (plainTextPassword.length < 5) {
            return res.json({
                status: 'error',
                error: 'Sua senha precisa ter pelo menos 6 caracteres'
            })
        }

        const password = await bcrypt.hash(plainTextPassword, 10)

        try {
            const response = await User.create({
                username,
                password
            })
            console.log('Usuário criado com sucesso: ', response)
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


    async login(req, res) {
        const {
            username,
            password
        } = req.body
        const user = await User.findOne({
            username
        }).lean()

        if (!user) {
            return res.json({
                status: 'error',
                error: 'Usuário ou senha incorretos'
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            // O usuário e a senha estão corretos.

            const token = jwt.sign({
                    id: user._id,
                    username: user.username
                },
                JWT_SECRET
            )

            return res.json({
                status: 'ok',
                data: token
            })
        }

        res.json({
            status: 'error',
            error: 'Usuário ou senha incorretos'
        })
    }
}
