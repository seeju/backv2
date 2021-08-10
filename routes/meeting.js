var express = require('express');
var router = express.Router();
const controllers = require ('../controllers/MeetingController')

router.post('/agendar', controllers.agendar);
router.delete('/:id', controllers.apagar);
router.put('/:id', controllers.editar);


module.exports = router;
