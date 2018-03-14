//  данные с формы
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports = (app, router, db) => {
    router.get('/admin', (req, res) => {
        res.render('pages/admin');
    });

    router.post('/admin/upload', (req, res, next) => {
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
                if (err) throw err;

                if (!db.get('products').value()) {
                    db.defaults({ products: [] }).write();
                }

                let startPos = fileName.indexOf('assets');
                let filePath = fileName.substr(startPos);

                db.get('products')
                    .push({ name: fields.name, price: fields.price, src: filePath })
                    .write();

                res.redirect('/admin');
            });
        })
    });
};