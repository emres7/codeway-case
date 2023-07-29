const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')
const { logSchema } = require('../validations/Logs')

const {  publishLog, retrieveAnalytics} = require('../controllers/Logs')

router.post('/publish', authenticate(), validate(logSchema), publishLog);
router.get('/analytics', authenticate(),retrieveAnalytics);

module.exports = router;