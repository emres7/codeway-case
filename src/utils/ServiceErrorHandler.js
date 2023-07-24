const { InternalServerError } = require('../errors');

const withServiceErrorHandling = (func) => {
    return async (...args) => {
      try {
        return await func(...args);
      } catch (err) {
        return new InternalServerError(err?.message);
      }
    };
  };


  module.exports = {
    withServiceErrorHandling
  };
  