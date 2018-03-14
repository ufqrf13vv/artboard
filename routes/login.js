module.exports = (app, router) => {
    router.get('/login', (req, res) => {
        res.render('pages/login');
    });

    router.post('/login', (req, res) => {
        if (req.body.email === 'mail@mail.ru' && req.body.password === '0129') {
            res.redirect('/admin');
        }

        res.render('pages/login', { msgslogin: 'Неверное имя пользователя или пароль!'});
    });
};