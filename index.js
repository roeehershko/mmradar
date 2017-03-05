/**
 * Created by roee on 3/1/2017.
 */
var path = require('path');
var twig = require("twig");
var fs = require('fs');
var express = require('express');
var app = express();

app.set('view engine', 'twig');
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/img", express.static(__dirname + '/public/img'));
app.use("/fonts", express.static(__dirname + '/public/fonts'));

app.get('/', function(req, res){

    res.render('homepage.twig', {
        what_hello : "Hello bbb"
    });
});

app.get('/post', function(req, res){

    res.render('post.twig', {
        what_hello : "Hello bbb"
    });
});

app.get('/unsubscribe', function(req, res){

    res.render('unsubscribe.twig', {
        what_hello : "Hello bbb"
    });
});



app.listen(3000);
