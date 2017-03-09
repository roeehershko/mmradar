"use strict";

const nodemailer = require('@nodemailer/pro');
const fs = require('fs');
const random = require('randomstring');


let transporterSettings = {
    host: 'mail.moneymakingradar.com',
    port: 587,
    secure: false,
    auth: {
        user: 'postmaster@mail.moneymakingradar.com',
        pass: 'Rhershko1@'
    },
    tls: {
        rejectUnauthorized: false
    }
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(transporterSettings);

module.exports = {
    send: function (to, cb) {
        var template = fs.readFileSync('./mmradar.html').toString();
        template = template.replace('{{ email }}', to);
        template = template.replace('{{ email }}', to);
        template = template.replace('{{ email }}', to);

        let mailOptions = {
            from: 'MMRadar <postmaster@mail.moneymakingradar.com>', // sender address
            replyTo: 'postmaster@mail.moneymakingradar.com',
            to: to, // list of receivers,
            bcc: [],
            subject: 'MMRadar Has Launched, Verification Required', // Subject line
            html: template,
            headers: {
                'Message-ID': random.generate(15).toLowerCase() + '@mail.moneymakingradar.com',
                'X-Mailer': 'Nodemailer',
                'Return-Path': 'postmaster@mail.moneymakingradar.com',
                'X-Accept-Language': 'en',
                'MIME-Version': '1.0',
                'X-UID': '7'
            }
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            cb();
        });
    }
}