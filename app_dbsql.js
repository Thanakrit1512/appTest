var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var PORT = 12345

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/db').then(()=>{
    console.log('Connection complete!');
},()=>{
    console.log('Connection fail!');
})

var app = express()
app.use(bodyParser.json())

var dataSchema = new mongoose.Schema({
    id:{type:String, unique:true, required:true},
    status:{type:String, required:true},
    date:{type:String, required:true}
})

var dataModel = mongoose.model('Data',dataSchema)

app.get('/getAll',(req,res)=>{
    dataModel.find().then((d)=>{
        console.log(d);
        res.send(d)
    },(err)=>{
        res.send(400).send(err)
    })
})

app.get('/getBetween/:id1/:id2',(req,res)=>{
    dataModel.find({id:{$gte:req.params.id1,$lte:req.params.id2}}).then((d)=>{
        console.log(d);
        res.send(d)
    },(err)=>{
        res.send(400).send(err)
    })
})

app.get('/getByStatus/:status',(req,res)=>{
    dataModel.find({status:req.params.status}).then((d)=>{
        console.log(d);
        res.send(d)
    },(err)=>{
        res.send(400).send(err)
    })
})

app.get('/drop/passwd',(req,res)=>{
    dataModel.remove().then((d)=>{
        console.log('Drop completed!');
        res.send(d)
    },(err)=>{
        res.send(400).send(err)
    })
})

app.post('/post', (req,res)=>{
    let data = new dataModel({
        id: req.body.id,
        status: req.body.status,
        date: new Date()
    })

    data.save().then((d)=>{
        console.log('Data = '+d);
        res.send(d)
    },(err)=>{
        res.status(400).send('Error: '+err)
    })
})

app.listen(PORT, ()=>{
    console.log('Listen port: '+PORT);
})