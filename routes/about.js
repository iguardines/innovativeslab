var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('templates/about');
});

module.exports = router;