var express = require('express');
var router = express.Router();
const controllers = require ('../controllers/MeetingController')

router.post('/agendar', controllers.agendar);
router.delete('/:id', controllers.apagar);
router.put('/:id', controllers.editar);
router.get('/', controllers.listar);
router.get('/:id', controllers.listaruser);


module.exports = router;
