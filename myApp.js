const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

console.log("Hello World");

// Middleware
app.use(bodyParser.urlencoded({extended: false}))

app.use('/json', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Route handler
app.get('/', (req, res) => {
  const absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath);
})

app.get('/json', (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE'];
  console.log(mySecret);
  if (mySecret === 'uppercase') {
    res.send({"message": "HELLO JSON"});
  } else {
    res.send({"message": "Hello json"});
  }
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

// Route parameters
// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
app.get('/:word/echo', (req, res) => {
  res.send({echo: req.params.word});
});

// Query parameter
// route_path: '/library'
// actual_request_URL: '/library?userId=546&bookId=6754'
// req.query: {userId: '546', bookId: '6754'}
app.get('/name', (req, res) => {
  res.send({name: req.query.first + " " + req.query.last});
});

app.post('/name', (req, res) => {
  res.send({name: req.body.first + " " + req.body.last});
});


























 module.exports = app;
