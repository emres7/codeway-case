const BaseError = (statusCode, name) => {
    return class BaseError extends Error {  
        constructor (message, data) {
    
          super(message || name || "Error");
    
          Error.captureStackTrace(this, this.constructor);
      
          this.data = data;
          this.name = name;
          this.status = statusCode;
        }
      
        statusCode() {
          return this.status
        }
    }
}
  
module.exports = BaseError;