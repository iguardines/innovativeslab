var express = require('express');
var router = express.Router();

      //route     cb
router.get('/', function (req, res) {
  res.send('Hello Cookie!');
});

module.exports = router;