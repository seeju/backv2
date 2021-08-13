const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';    


module.exports = {

    async alterarsenha (req,res) {
        const { token, newpassword: plainTextPassword } = req.body
        //tem que pegar o token gerado no login para poder mudar a senha
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({ status: 'error', error: 'Senha inválida' })
        }

        if (plainTextPassword.length < 5) {
            return res.json({
                status: 'error',
                error: 'Sua senha precisa ter pelo menos 6 caracteres'
            })
        }
    
        try {
            const user = jwt.verify(token, JWT_SECRET)
    
            const _id = user.id
    
            const password = await bcrypt.hash(plainTextPassword, 10)
    
            await User.updateOne(
                { _id },
                {
                    $set: { password }
                }
            )
            res.json({ status: 'ok' })
        } catch (error) {
            console.log(error)
            res.json({ status: 'error', error: ';))' })
        }
    }

        
}
