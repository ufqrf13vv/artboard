const Koa = require('koa');
const app = new Koa();
const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views/pages',
    basedir: './public',
    app: app
});

module.exports = pug;
