let express = require('express');
let app = express();

console.log("Hello World");

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Route handler
app.get('/', function(req, res) {
  const absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath);
})































 module.exports = app;
