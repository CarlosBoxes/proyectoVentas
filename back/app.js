var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var app = express();

mongoose.connect('mongodb://localhost:27017/sistema',{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=> {
    if (err){
        throw err;
    }else{
        console.log("Corriendo servidor");
        app.listen(port, function(){
            console.log("Servidor conectado en: " + port);
        });
    }
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

module.exports = app;