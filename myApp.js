let express = require('express');
let app = express();

console.log("Hello World");

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Route handler
app.get('/', (req, res) => {
  const absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath);
})

app.get('/json', (req, res) => {
  res.send({"message": "Hello json"});
})































 module.exports = app;
