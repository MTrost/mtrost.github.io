const express = require('express');

var app = express();

app.use(express.static(__dirname + '/'));
//app.set('', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
  });

app.listen(3000, () => {
  console.log('Server is up on port 3000');
  });
