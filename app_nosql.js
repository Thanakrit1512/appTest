var mongojs = require('./db')
var express = require('express')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var port = 5555

var db = mongojs.connect;
var app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.json());

app.get('/',(req, res)=>{
  res.send('RestfulAPI for WU LoRa')
})

app.get('/detail',(req, res)=>{
  db.logger.find((err, docs)=>{
    let ind = Object.keys(docs).length-(1)
    res.render('index',{DevEUI:docs[ind].Logger.DevEUI_uplink.DevEUI, DevAddr:docs[ind].Logger.DevEUI_uplink.DevAddr,
                      loggerTime:docs[ind].Logger.DevEUI_uplink.Time, serverTime:docs[ind].Timestamp,
                      payload_hex:docs[ind].Logger.DevEUI_uplink.payload_hex, LrrRSSI:parseInt(docs[ind].Logger.DevEUI_uplink.LrrRSSI)})
  })
})

app.get('/get',(req, res)=>{
  db.logger.find((err, docs)=>{
    res.send(docs)
  })
})

app.get('/countObj',(req, res)=>{
  db.logger.find((err, docs)=>{
    console.log(Object.keys(docs).length)
    res.send(200,Object.keys(docs).length)
  })
})

app.get('/drop/:passwd',(req, res)=>{
  if(req.params.passwd=='1234'){
    db.logger.drop((err, docs)=>{
      console.log('drop completed!')
      res.send('correct password!'+'\n'+'drop completed!')
    })
  }else{
    res.send('Incorrect password!')
  }
})

app.post('/postLogger',(req, res)=>{
    var json = {'Logger':req.body,'Timestamp':new Date()};
    db.logger.insert(json,(err, docs)=>{
      console.log(docs);
      res.send(docs);
    })
  })

app.listen(port,()=>{
    console.log('listen on port '+port)
})