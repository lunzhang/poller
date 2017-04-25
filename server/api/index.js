var express = require('express');
var router = express.Router();

var user = require('./user');

router.post('/login', user.login);
router.post('/update_profile', user.updateProfile);
router.post('/upload_poll', user.uploadPoll);

module.exports = router;
