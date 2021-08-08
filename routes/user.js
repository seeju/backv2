var express = require('express');
var router = express.Router();
const controllers = require ('../controllers/User.Controller');

router.post('/add', controllers.add);
router.post('/login', controllers.login);

module.exports = router;