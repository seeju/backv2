var express = require('express');
var router = express.Router();
const controllers = require ('../controllers/AdminController');

router.post('/add', controllers.add);

module.exports = router;