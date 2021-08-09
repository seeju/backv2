var express = require('express');
var router = express.Router();
const controllers = require ('../controllers/MeetingController')

router.post('/agendar', controllers.agendar);
router.delete('/:id', controllers.apagar);

module.exports = router;
