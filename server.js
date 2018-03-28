const Koa = require('koa');
const app = new Koa();
const router = require('./routes');
const static = require('koa-static');

app.use(static(__dirname + '/public'));
app.use(router.routes());

app.listen(3000);