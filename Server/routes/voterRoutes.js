const express = require('express');
const router = express.Router();

const voterController = require('../controllers/voterController');
const pollController = require('../controllers/pollController');
const {authenticateAdmin, authenticateUser} = require('../middlewares/authMiddleware')

router.post('/signup', voterController.voterSignup);
router.post('/login', voterController.voterLogin);

router.route('/vote').post(authenticateUser, pollController.vote);
router.route('/viewPolls').get(authenticateUser, pollController.viewActivePolls);

module.exports = router;
