var mongojs = require('./db')
var express = require('express')
var bodyParser = require('body-parser')
var port = 5555

var db = mongojs.connect;
var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Code for RESTful API");
  })

app.get('/get', function (req, res) {
  db.logger.find(function (err, docs) {
    console.log(docs)
    res.send(docs)
  })
})
app.post('/addUser', (req, res)=>{
    var json = req.body;
    db.logger.insert(json, function (err, docs) {
      console.log(docs);
      res.send(docs);
    })
  })

app.listen(port,()=>{
    console.log('listen on port '+port)
})