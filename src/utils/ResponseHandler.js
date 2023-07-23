const { InternalServerError } = require('../../errors');

class ResponseHandler {
    static sendSuccess(res, data, statusCode = 200) {
        return res.status(statusCode).json(data);
    }
  
    static sendError(res, message, data, statusCode = 500) {
        const errorResponse = data || { error: message };
        return res.status(statusCode).json(errorResponse);
    }

    static handleDefaultError(res, err) {
        console.log(err?.message)
        const defaultError = new InternalServerError(err?.message);

        return this.handle(res, defaultError);
    }
  
    static handle(res, controllerResponse) {

        if(controllerResponse instanceof Error) {

            const errorCode = controllerResponse.statusCode();
            const errorMessage = controllerResponse.message;
            const errorData = controllerResponse.data;

            return this.sendError(res, errorMessage, errorData, errorCode);
        } else {
            
            const data = controllerResponse;
            return this.sendSuccess(res, data);
        }
    }
}

module.exports = ResponseHandler;