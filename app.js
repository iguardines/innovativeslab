//heroku
// ejs as layout
// /      /about     /contact
// header, footer, include
// contact route has form
// name email message
// send button
// email contents – module nodemailer
var fs = require('fs');

var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var routes = require('./routes/index');
var about = require('./routes/about');
var contact = require('./routes/contact');

var app = express();

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'Choc Chip Cookies';

app.use(bodyParser.urlencoded({extended: true}));
app.use(lessCSS('public'));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

app.use(function(req, res, next) {
  var client = require('./lib/loggly')('incoming');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method
  });
  next();
});

app.use(express.static('public'));

//routes
app.use('/', routes);
app.use('/about', about);
app.use('/contact', contact);

//errors
app.use(function(req, res) {
  res.status(403).send('Unauthorized!');
});

app.use(function(err, req, res, next) {
  var client = require('./lib/loggly')('error');

   client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
    stackTrace: err.stack
  });

  //pass 4 arguments to create an error handling middleware
  console.log('errror', err.stack);
  res.status(500).send('My bad');
});

var server = app.listen(3500, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

