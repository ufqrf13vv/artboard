const pug = require('./controller');
const fs = require('fs');
const path = require('path');
//  Модели
const Products = require('../models/products');
const Skills = require('../models/skills');

exports.index = ctx => {
    ctx.body = pug.render('admin');
};

exports.upload = async ctx => {
    let { name, price } = ctx.request.body.fields;
    let photo = ctx.request.body.files.photo;
    let products = path.join('public', 'assets', 'img', 'products');
    let fileName = '';

    if (!fs.existsSync(products)) {
        fs.mkdir(products);
    }
    //  Изображение товара
    if (!photo.size) {
        return ctx.body = pug.render('admin', {msgfile: 'Вы не выбрали изображение товара!'});
    }
    //  Название товара
    if (!name) {
        fs.unlinkSync(photo.path);

        return ctx.body = pug.render('admin', {msgfile: 'Введите название товара!'});
    }
    //  Цена товара
    if (!price) {
        fs.unlinkSync(photo.path);

        return ctx.body = pug.render('admin', {msgfile: 'Введите цену товара!'});
    }

    fileName = path.join(products, photo.name);

    await fs.rename(photo.path, fileName, err => {
        if (err) {
            console.error(err);
        }

        let startPos = fileName.indexOf('assets');
        let filePath = fileName.substr(startPos);

        Products.create(name, price, filePath);
    });

    return ctx.redirect('/admin', { msgfile: 'Товар добавлен в каталог!'});
};

exports.skills = ctx => {
    let {age, concerts, cities, years} = ctx.request.body;

    if (!age || !concerts || !cities || !years) {
        return ctx.body = pug.render('admin', {msgskill: 'Заполните все поля!'});
    }

    let receivedSkills = Skills.get();
    let counter = 0;
    //  Изменение данных
    for (let key in ctx.request.body) {
        if (receivedSkills[counter].number != ctx.request.body[key]) {
            Skills.update(receivedSkills[counter].number, ctx.request.body[key])
        }
        counter++;
    }

    return ctx.redirect('/admin', {msgskill: 'Данные успешно сохранены'});
};

