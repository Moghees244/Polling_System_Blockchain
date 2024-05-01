const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');
const pollController = require('../controllers/pollController');

router.post('/signup', voterController.voterSignup);
router.post('/login', voterController.voterLogin);
router.post('/vote', pollController.vote);
router.get('/viewPolls', pollController.viewActivePolls);

module.exports = router;
