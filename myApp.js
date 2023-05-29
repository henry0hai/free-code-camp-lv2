let express = require('express');
let app = express();
require('dotenv').config();

console.log("Hello World");

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Route handler
app.get('/', (req, res) => {
  const absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath);
})

// Middleware
app.use('/json', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

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

// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
app.get('/:word/echo', (req, res) => {
  res.send({echo: req.params.word});
});


































 module.exports = app;
