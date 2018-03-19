const pug = require('./controller');
const nodemailer = require('nodemailer');
const config = require('../config.json');
const products = require('../db.json').products;
const skills = require('../db.json').skills;

exports.index = ctx => {
    ctx.body = pug.render('index', { products, skills });
};

exports.email = async ctx => {
    let {name, email, message} = ctx.request.body;
    // все поля должны быть заполнены
    if (!name || !email || !message) {
        ctx.body = pug.render('index', {msgemail: 'Заполните пожалуйста все поля!', products, skills});
    }
    //инициализируем модуль для отправки писем и указываем данные из конфига
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
        from: `"${name}" <${config.mail.smtp.auth.user}>`,
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text: `${message}\nОтправлено с: <${email}>`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            ctx.body = pug.render('index', {msgemail: `При отправке письма произошла ошибка!: ${error}`, products, skills});
        }
        ctx.body = pug.render('index', {msgemail: 'Письмо успешно отправлено!', products, skills});
    });

    transporter.close();
};
