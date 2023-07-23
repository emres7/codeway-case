const ResponseHandler = require('../utils/ResponseHandler');


const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return ResponseHandler.handleDefaultError(res, error);
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
