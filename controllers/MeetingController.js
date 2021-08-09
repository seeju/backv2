const Meeting = require('../models/meeting');
const User = require('../models/user')

module.exports = {
    async agendar(req,res) {
        const {
            lider,
            liderado,
            data,
            realizado,
        } = req.body

        if (!lider || typeof lider !== 'string') {
            return res.json({
                status: 'error',
                error: 'Líder não encontrado'
            })
        }

        if (!liderado || typeof lider !== 'string') {
            return res.json({
                status: 'error',
                error: 'Liderado não encontrado'
            })
        }

       /* if (!data || typeof data !== 'date') {
            return res.json({
                status: 'error',
                error: 'Data inválida'
            })
        }*/

        const CheckLider = await User.findById(lider);
        const CheckLiderado = await User.findById(liderado);

        if (!CheckLider || !CheckLiderado) {
            return res.status(401).json({error: "Líder ou liderado não encontrado"})
        }

        try {
            const meeting = await Meeting.create({
                lider,
                liderado,
                data,
                realizado
            })
            meeting.lider = CheckLider;
            meeting.liderado = CheckLiderado;
            console.log('Reunião criada com sucesso! ', response)
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({
                    status: 'error',
                    error: 'Erro'
                })
            }
            throw error
        }

        res.json({
            status: 'ok'
        })

    }
}
