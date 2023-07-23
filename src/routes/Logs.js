const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const { logSchema } = require('../validations/Logs')

const {  publishLog, retrieveAnalytics} = require('../controllers/Logs')

router.post('/publish', validate(logSchema), publishLog);
router.get('/analytics', retrieveAnalytics);

module.exports = router;