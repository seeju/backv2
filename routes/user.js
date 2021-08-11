var express = require('express');
var router = express.Router();
const controllers = require ('../controllers/UserController');

router.post('/login', controllers.login);
router.post('/alterar-senha', controllers.alterarsenha);

module.exports = router;
