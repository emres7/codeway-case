const gcpService = require('../services/GCPService');

const ResponseHandler = require('../utils/ResponseHandler');

const publishLog = async (req, res) => {
  try {
    const data = req.body;
    const response = await gcpService.publishData(data);

    return ResponseHandler.handle(res, response);
  } catch(err) {
    return ResponseHandler.handleDefaultError(res, err);
  }
};


const retrieveAnalytics = async (req, res) => {
  try {
    const response = await gcpService.retrieveFromQuery();

    return ResponseHandler.handle(res, response);
  } catch(err) {
    return ResponseHandler.handleDefaultError(res, err);
  }
};

module.exports = {
  publishLog,
  retrieveAnalytics
}