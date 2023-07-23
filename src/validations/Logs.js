const Joi = require('joi');

const logSchema = Joi.object({
  type : Joi.string(),
  session_id : Joi.string(),
  event_name: Joi.string(),
  event_time: Joi.number().integer(),
  page: Joi.string(),
  country: Joi.string(),
  region: Joi.string(),
  city: Joi.string(),
  user_id: Joi.string().required()
});


module.exports = {
    logSchema
}