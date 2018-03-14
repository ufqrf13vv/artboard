module.exports = (app, router, db) => {
    router.post('/admin/skills', (req, res) => {
        let {age, concerts, cities, years} = req.body;

        if (!age || !concerts || !cities || !years) {
            return res.render('pages/admin', { msgskill: 'Заполните все поля!' });
        }

        if (!db.get('skills').value()) {
            db.defaults({ skills: [] }).write();
        }

        db.get('skills').remove().write();
        db.get('skills')
            .push({ number: age, text: 'Возраст начала занятий на скрипке'})
            .push({ number: concerts, text: 'Концертов отыграл'})
            .push({ number: cities, text: 'Максимальное число городов в туре'})
            .push({ number: years, text: 'Лет на сцене в качестве скрипача'})
            .write();

        res.render('pages/admin', { msgskill: 'Данные успешно сохранены' });
    });
};