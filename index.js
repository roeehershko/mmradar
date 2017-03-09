/**
 * Created by roee on 3/1/2017.
 */
var path = require('path');
var twig = require("twig");
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = express();
var shortid = require('shortid');
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'test',
    password : 'Jupt7ZujcnMDbHpx',
    database : 'mmradar'
});


connection.connect();

app.set('view engine', 'twig');
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/img", express.static(__dirname + '/public/img'));
app.use("/fonts", express.static(__dirname + '/public/fonts'));

var posts = null;
connection.query('SELECT reviews.*, offers.verified, offers.link, offers.results FROM reviews INNER JOIN offers ON offers.review_id = reviews.id', [], function (err, data) {
console.log(data);
    posts = data;
});


app.use('/', function(req, res, next) {
    var id = shortid.generate();
    if (req.query.track) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        var clickData = {
            hash: id,
            ip: ip,
            p1: req.query.p1 || req.query.sub || '',
            p2: req.query.p2 || '',
            source: req.query.source || ''
        };

        connection.query('INSERT INTO clicks SET ?', clickData, function (err, res) {

            if ( ! err && req.query.sub) {
                var subsData = {
                    name: req.query.p2,
                    email: req.query.sub,
                    click_id: res.insertId
                };

                connection.query('INSERT INTO subscribers SET ? ON DUPLICATE KEY UPDATE id=id', subsData, function (err, res) {
                    console.log(err, res);
                });
            }
        });
    }

    next();
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
    var post = connection.query('SELECT reviews.*, offers.link, offers.verified, offers.results FROM reviews INNER JOIN offers ON offers.review_id = reviews.id WHERE reviews.id = ?', [req.params.postId], function (err, data) {
        res.render('post.twig', {
            review : data[0],
            reviewResults: data[0].results.split(','),
            posts: posts
        });
    });
});

app.get('/unsubscribe', function(req, res){

    res.render('unsubscribe.twig', {
        what_hello : "Hello bbb"
    });
});


app.post('/subscribe', function(req, res){

    var subsData = {
        name: req.body.name || '',
        email: req.body.email || '',
        click_id: null
    };

    connection.query('INSERT INTO subscribers SET ? ON DUPLICATE KEY UPDATE id=id', subsData, function (err, res) {
        console.log(err, res);
    });

    res.end('{ "success": "1" }')
});

app.listen(3000);
