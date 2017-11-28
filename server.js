const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var todos = [];

app.post('/', (req, res) => {
  todos.push(req.body.todo);
  res.status(201).json({'todo' : req.body.todo});
  });


app.get('/', (req, res) => {
  res.status(200).json({'todos': todos});
  res.render('index.html');
  });

app.listen(3000, () => {
  console.log('Server is up on port 3000');
  });
