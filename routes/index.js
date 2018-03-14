const express = require('express');
const router = express.Router();
//  БД
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

require('./admin')(express, router, db);
require('./main')(express, router);
require('./skills')(express, router, db);
require('./login')(express, router);

module.exports = router;
