var mongojs = require('./db')
var express = require('express')
var bodyParser = require('body-parser')
var port = 5555

var db = mongojs.connect;
var app = express();

app.use(bodyParser.json());

app.get('/',  (req, res)=>{
    res.send("Code for RESTful API");
  })

app.get('/count', function (req, res) {
    db.logger.find((eer,docs)=>{
        res.send(200,docs)
    }).count((err,docs)=>{
        console.log(docs);
    })
  })

app.get('/get',  (req, res)=>{
  db.logger.find((err, docs)=>{
      var d = docs[0]
    console.log(d)
    res.send(docs)
  })
})

app.post('/post', (req, res)=>{
    var json = req.body;
    db.logger.insert(json,(err, docs)=>{
      console.log(docs);
      res.send(docs);
    })
  })

app.listen(port,()=>{
    console.log('listen on port '+port)
})