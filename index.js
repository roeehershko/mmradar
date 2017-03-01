/**
 * Created by roee on 3/1/2017.
 */
var path = require('path');
var twig = require("twig");
var fs = require('fs');
var express = require('express');
var app = express();

app.set('view engine', 'twig');
app.use("/public", express.static(__dirname + '/public'));

app.get('/', function(req, res){

    res.render('homepage.twig', {
        what_hello : "Hello bbb"
    });
});



app.listen(3000);
