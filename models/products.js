const db = require('./db');

exports.create = (name, price, path) => {
    if (!db.get('products').value()) {
        db.defaults({
                products: []
            })
            .write();
    }

    db.get('products')
        .push({
            name: name,
            price: price,
            src: path
        })
        .write();
};