exports.index = (req, res) => {
    res.render('pages/login');
};

exports.autorization = (req, res) => {
    if (req.body.email === 'mail@mail.ru' && req.body.password === '0129') {
        res.redirect('/admin');
    }

    res.render('pages/login', { msgslogin: 'Неверное имя пользователя или пароль!'});
};