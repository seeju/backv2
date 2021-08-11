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

        atrasado = false

        dataAtual = Date.parse(new Date()) //converte a data atual em formato comparável
        dataReuniao = Date.parse(data) //converte a data da reunião em formato comparável

        if(dataReuniao < dataAtual == true){ //verifica se a reunião está atrasada
            atrasado = true 
        }


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

        if (!CheckMeeting) {
            return res.status(401).json({error: "Reunião não encontrada"})
        }

        var meeting = await Meeting.findByIdAndDelete(
            req.params.id,
        )

        res.json({
            status: 'Reunião apagada!'
        })

    },


    async editar (req,res) {
        const CheckMeeting = await Meeting.findOne({_id: req.params.id}).lean();
        const dados = req.body


        if (!CheckMeeting) {
            return res.status(401).json({error: "Reunião não encontrada"})
        }

        
            await Meeting.updateMany ({ "id": CheckMeeting.id }, {"$set":{
                "data": dados.data, 
                "frequencia": dados.frequencia, 
                "realizado": dados.realizado, 
            }})
            

        res.json({
            status: 'Reunião atualizada com sucesso!'
        })

    },

    async listar (req,res) {
        const meetings = await Meeting.find();
        res.json(meetings)

    },

    async listaruser(req,res) {
        var meetinglider = await Meeting.find({lider: req.params.id}).lean()
        var meetingliderado = await Meeting.find({liderado: req.params.id}).lean()
        return res.json({meetinglider, meetingliderado})
 
    }


}
