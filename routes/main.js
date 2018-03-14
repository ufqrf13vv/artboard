const nodemailer = require('nodemailer');
const config = require('../config.json');
const products = require('../db.json').products;
const skills = require('../db.json').skills;

module.exports = (app, router) => {
    router.get('/', (req, res, next) => {
        res.render('pages/index', { products, skills });
    });

    router.post('/', (req, res, next) => {
        let {name, email, message} = req.body;
        // все поля должны быть заполнены
        if (!name || !email || !message) {
            return res.json({msg: 'Все поля нужно заполнить!', status: 'Error'});
        }
        //инициализируем модуль для отправки писем и указываем данные из конфига
        const transporter = nodemailer.createTransport(config.mail.smtp);
        const mailOptions = {
            from: `"${name}" <${config.mail.smtp.auth.user}>`,
            to: config.mail.smtp.auth.user,
            subject: config.mail.subject,
            text: `Отправлено с: <${email}>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({msgemail: `При отправке письма произошла ошибка!: ${error}`, status: 'Error'});
            }

            res.render('pages/index', { msgemail: 'Письмо успешно отправлено!', products, skills });
        });

        transporter.close();
    });
};