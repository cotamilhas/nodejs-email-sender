const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email,
        pass: config.password
    }
});

function sendEmail(to, subject, message, callback) {
    const mailOptions = {
        from: config.email,
        to: to,
        subject: subject,
        html: `<p>${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending:', error);
            callback(error);
        } else {
            console.log('Email sent:', info.response);
            callback(null);
        }
    });
}

module.exports = sendEmail;
