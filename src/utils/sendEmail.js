const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = async function sendEmail(email) {

    if (process.env.MAIL_HOST === undefined || process.env.MAIL_HOST === '') {
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: 'Car Rental - Web App',
        text: 'Foi realizado login. E-mail: ' + email,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info.response);
        }
    });
}
