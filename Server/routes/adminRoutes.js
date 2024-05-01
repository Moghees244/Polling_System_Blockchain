const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const pollController = require('../controllers/pollController');

router.post('/login', adminController.adminLogin);
router.post('/createPoll', pollController.createPoll);
router.post('/deletePoll', pollController.deletePoll);
router.get('/viewPolls', pollController.viewAllPolls);
router.get('/results', pollController.adminView);

module.exports = router;
