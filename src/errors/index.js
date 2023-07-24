const BaseError = require('./baseError');

const InternalServerError = BaseError(500, "Internal Server Error");
const ForbiddenError = BaseError(403, "Forbidden Error");
const NotFoundError = BaseError(404, "Not Found Error");
const BadRequestEror = BaseError(400, "Bad Request Error");
const UnauthorizedError = BaseError(401, "Unauthorized Error");

module.exports = {
    InternalServerError,
    ForbiddenError,
    NotFoundError,
    BadRequestEror,
    UnauthorizedError
}