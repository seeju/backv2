var express = require('express');
var router = express.Router();
const controllers = require ('../controllers/AdminController');

router.post('/add', controllers.add);
router.delete('/:id', controllers.apagar);
router.put('/:id', controllers.editar);
router.get('/', controllers.listar);

module.exports = router;