/**
 * Created by roee on 3/1/2017.
 */
var path = require('path');
var twig = require("twig");
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = express();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mmradar'
});


connection.connect();

app.set('view engine', 'twig');
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/img", express.static(__dirname + '/public/img'));
app.use("/fonts", express.static(__dirname + '/public/fonts'));

var posts = null;
connection.query('SELECT reviews.*, offers.verified, offers.results FROM reviews INNER JOIN offers ON offers.review_id = reviews.id', [], function (err, data) {
    posts = data;
});

app.get('/', function(req, res){

    res.render('homepage.twig', {
        posts : posts
    });
});

app.get('/reviews/test', function(req, res){
    res.render('post-preview.twig', {

    });
});

app.get('/reviews/:postId', function(req, res){
    var post = connection.query('SELECT reviews.*, offers.verified, offers.results FROM reviews INNER JOIN offers ON offers.review_id = reviews.id WHERE reviews.id = ?', [req.params.postId], function (err, data) {
        res.render('post.twig', {
            review : data[0],
            reviewResults: data[0].results.split(',')
        });
    });
});



app.get('/unsubscribe', function(req, res){

    res.render('unsubscribe.twig', {
        what_hello : "Hello bbb"
    });
});



app.listen(3000);
