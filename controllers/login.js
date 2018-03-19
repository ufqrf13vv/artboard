const pug = require('./controller');

exports.index = ctx => {
    ctx.body = pug.render('login');
};

exports.autorization = ctx => {
    if (ctx.request.body.email === 'mail@mail.ru' && ctx.request.body.password === '0129') {
        ctx.redirect('admin')
    }

    ctx.body = pug.render('login', { msglogin: 'Неверное имя пользователя или пароль!'});
};