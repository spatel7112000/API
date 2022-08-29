// Require File

require("./connect/config");
const model = require("./model/model");

// Require Module 

const express = require("express");
const multer = require("multer");
const app = express();
app.use(express.json());



//<----------- upload File ----------->//

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "image");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("final_data");

app.post("/file", upload, (req, res) => {
  res.send("hello from simple server :)");
});


//<----------- post File ----------->//

app.post('/post', async (req,res)=>{
    let data = new model(req.body)
    let result = await data.save();
    console.log(result)
    res.send(result)
})


//<----------- get File ----------->//

app.get('/get',async (req, res)=>{
    let data = await model.find()
    res.send(data)
    console.log(data)
})


//<----------- search File ----------->//

app.get('/search/:key',async (req, res)=>{
    console.log(req.params.key)
    let data = await model.find({
        $or: [
            {Name: {$regex: req.params.key}},
            {Number: {$regex: req.params.key}},
            {College: {$regex: req.params.key}},
            {Education: {$regex: req.params.key}}
        ]
    })
    res.send(data)
})


//<----------- put File ----------->//

app.put('/put/:_id',async (req, res)=>{
    let data = await model.updateOne(req.params,{$set: req.body})
    res.send(data)
    console.log(data)
})


//<----------- delete File ----------->//

app.delete('/delete/:_id',async (req, res)=>{
    let data = await model.deleteOne(req.params)
    res.send(data)
    console.log(data)
})

app.listen(8888);
