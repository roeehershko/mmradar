"use strict";

var sender = require('./MailerSend2.js');
var mysql = require('mysql');
var async = require('async');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'test',
    password : 'Jupt7ZujcnMDbHpx',
    database : 'mmradar'
});

connection.query('SELECT * FROM gr_leads', function (err, res) {

    async.eachLimit(res, 1, function (user, cb) {

        sender.send(user.email, function () {
            connection.query('UPDATE gr_leads SET used = 1 WHERE email = ?', [user.email], function () {
                cb();
            });
        });
    });

});
