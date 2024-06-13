const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const pollController = require('../controllers/pollController');
const {authenticateUser, authenticateAdmin} = require('../middlewares/authMiddleware');

router.post('/login', adminController.adminLogin);

router.route('/createPoll').post(/* authenticateAdmin, */ pollController.createPoll);
router.route('/deletePoll').post(authenticateAdmin, pollController.deletePoll);
router.route('/viewPolls').get(authenticateAdmin, pollController.viewAllPolls);
router.route('/results').get(authenticateAdmin, pollController.viewActivePolls);

module.exports = router;
