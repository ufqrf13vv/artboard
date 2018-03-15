const express = require('express');
const router = express.Router();
//  Контроллеры
const main = require('../controllers/main');
const login = require('../controllers/login');
const admin = require('../controllers/admin');

router.get('/', main.index);
router.post('/', main.email);
router.get('/login', login.index);
router.post('/login', login.autorization);
router.get('/admin', admin.index);
router.post('/admin/upload', admin.upload);
router.post('/admin/skills', admin.skills);

module.exports = router;
