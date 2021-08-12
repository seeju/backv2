var express = require('express');
const controllers = require('../controllers/IndexController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "One on one's" });
});

router.post('/home', controllers.home);

module.exports = router;
