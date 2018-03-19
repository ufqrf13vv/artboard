const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = new KoaRouter();
const koaBody = require('koa-body');
const path = require('path');
const products = path.join(process.cwd(), 'public', 'assets', 'img', 'products');
//  Контроллеры
const main = require('../controllers/main');
const login = require('../controllers/login');
const admin = require('../controllers/admin');

router.get('/', main.index);
router.post('/', koaBody(), main.email);
router.get('/login', login.index);
router.post('/login', koaBody(), login.autorization);
router.get('/admin', admin.index);
router.post('/admin/upload', koaBody({
    multipart: true,
    formidable: {
        uploadDir: products
    }
}), admin.upload);
router.post('/admin/skills', koaBody(), admin.skills);

module.exports = router;