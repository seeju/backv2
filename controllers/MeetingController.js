const Meeting = require('../models/meeting');
const User = require('../models/user')

module.exports = {
    async agendar(req,res) {
        const {
            lider,
            liderado,
            data,
            frequencia,
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

        const CheckLider = await User.findOne({username: lider}).lean();
        const CheckLiderado = await User.findOne({username: liderado}).lean();

        if (!CheckLider || !CheckLiderado) {
            return res.status(401).json({error: "Líder ou liderado não encontrado"})
        }

        try {
            const meeting = await Meeting.create({
                lider: CheckLider._id,
                liderado: CheckLiderado._id,
                data,
                frequencia,
                realizado
            })
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
            status: 'Reunião criada com sucesso!'
        })

    },

    async apagar (req,res) {
        const CheckMeeting = await Meeting.findOne({_id: req.params.id}).lean();

        console.log(CheckMeeting)

        if (!CheckMeeting) {
            return res.status(401).json({error: "Reunião não encontrada"})
        }

        var meeting = await Meeting.findByIdAndDelete(
            req.params.id,
        )

        res.json({
            status: 'Reunião apagada!'
        })

    }

}