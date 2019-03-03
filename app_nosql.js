var mongojs = require('./db')
var express = require('express')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var passwdDrop = 1234567890
var port = 5555

var db = mongojs.connect;
var app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.json());

app.get('/',(req, res)=>{
  var bangkokTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"});
  res.render('index',{serverTime: new Date(bangkokTime)})
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

app.get('/detail',(req, res)=>{
  db.logger.find((err, docs)=>{
    let ind = Object.keys(docs).length-(1)
    if(ind+1 == 0){
      res.render('noData')
    }else{
      res.render('detail',{DevEUI:docs[ind].Logger.DevEUI_uplink.DevEUI, DevAddr:docs[ind].Logger.DevEUI_uplink.DevAddr,
        loggerTime:docs[ind].Logger.DevEUI_uplink.Time, serverTime:docs[ind].Timestamp,
        payload_hex:docs[ind].Logger.DevEUI_uplink.payload_hex, LrrRSSI:parseInt(docs[ind].Logger.DevEUI_uplink.LrrRSSI)})
    }
  })
})

app.get('/drop',(req, res)=>{
  res.sendFile(__dirname+'/'+'dropFrom.html')
})
app.get('/resDrop',(req,res)=>{
  if(req.query.passwd==passwdDrop){
    db.logger.drop((err,docs)=>{
      res.send('Drop Success!')
    })
  }else{
    res.send('Drop Fail!')
  }
})

app.post('/postLogger',(req, res)=>{
  var bangkokTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"});
  var json = {'Logger':req.body,'Timestamp':new Date(bangkokTime)};
  db.logger.insert(json,(err, docs)=>{
    console.log(docs);
    res.send(docs);
  })
})

app.listen(port,()=>{
    console.log('listen on port '+port)
})