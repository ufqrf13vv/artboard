const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
//  Модели
const Products = require('../models/products');
const Skills = require('../models/skills');

exports.index = (req, res) => {
    res.render('pages/admin');
};

exports.upload = (req, res, next) => {
    let form = new formidable.IncomingForm();
    let products = path.join('public', 'assets', 'img', 'products');
    let fileName = '';

    if (!fs.existsSync(products)) {
        fs.mkdir(products);
    }

    form.uploadDir = path.join(process.cwd(), products);

    form.parse(req, (err, fields, files) => {
        if (err) return next(err);
        //  Изображение товара
        if (!files.photo.name || !files.photo.size) {
            return res.render('pages/admin', {msgfile: 'Вы не выбрали изображение товара!'});
        }
        //  Название товара
        if (!fields.name) {
            fs.unlink(files.photo.path);

            return res.render('pages/admin', {msgfile: 'Введите название товара!'});
        }
        //  Цена товара
        if (!fields.price) {
            fs.unlink(files.photo.path);

            return res.render('pages/admin', {msgfile: 'Введите цену товара!'});
        }

        fileName = path.join(products, files.photo.name);

        fs.rename(files.photo.path, fileName, err => {
            if (err) return next(err);

            let startPos = fileName.indexOf('assets');
            let filePath = fileName.substr(startPos);

            Products.create(fields.name, fields.price, filePath);

            res.redirect('/admin');
        });
    })
};

exports.skills = (req, res) => {
    let {age, concerts, cities, years} = req.body;

    if (!age || !concerts || !cities || !years) {
        return res.render('pages/admin', {msgskill: 'Заполните все поля!'});
    }

    let receivedSkills = Skills.get();
    let counter = 0;
    //  Изменение данных
    for (let key in req.body) {
        if (receivedSkills[counter].number != req.body[key]) {
            Skills.update(receivedSkills[counter].number, req.body[key])
        }
        counter++;
    }

    res.render('pages/admin', {msgskill: 'Данные успешно сохранены'});
};