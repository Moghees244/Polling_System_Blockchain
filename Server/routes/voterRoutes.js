const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');

// User signup route
router.post('/signup', voterController.voterSignup);

// User login route
router.post('/login', voterController.voterLogin);

module.exports = router;
