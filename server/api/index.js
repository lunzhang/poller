var express = require('express');
var router = express.Router();

var user = require('./user');
var polls = require('./polls');

router.post('/login', user.login);
router.post('/update_profile', user.updateProfile);
router.post('/upload_poll', polls.uploadPoll);
router.post('/vote_poll',polls.votePoll);

router.get('/fetch_polls', polls.fetchPolls);

module.exports = router;
