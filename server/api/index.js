var express = require('express');
var router = express.Router();

var user = require('./user');

router.post('/login', user.login);

module.exports = router;
