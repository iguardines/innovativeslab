var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function(req, res) {
  res.render('templates/contact')
});



module.exports = router;