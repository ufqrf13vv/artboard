const db = require('./db');

exports.get = () => {
    if (!db.get('skills').value()) {
        db.defaults({skills: []}).write();
    }

    return db.get('skills').value();
};

exports.update = (findNumber, updateNumber) => {
    db.get('skills')
        .find({
            number: findNumber
        })
        .assign({
            number: updateNumber
        })
        .write();
};