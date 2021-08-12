const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';    


module.exports = {
    async home(req, res) {
        const {
            username,
            password
        } = req.body
        const user = await User.findOne({
            username
        }).lean()

        if (!user) {
            
            res.json({
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
                JWT_SECRET,
            )

            return res.render('inicio')
        }

        res.json({
            status: 'error',
            error: 'Usuário ou senha incorretos'
        })
    }
}