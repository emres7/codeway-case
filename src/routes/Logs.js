const express = require('express');
const router = express.Router();


const {  publishLog, retrieveAnalytics} = require('../controllers/Logs')

router.post('/publish', publishLog);
router.get('/analytics', retrieveAnalytics);

module.exports = router;