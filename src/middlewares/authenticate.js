const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticate = () => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
      }

      access_token = process.env.JWT_SECRET

    JWT.verify(token, access_token, (err, user) => {
      if (err) {
        return res
          .status(httpStatus.FORBIDDEN)
          .send({ message: "Invalid token" });
      }

      next();
    });
  };
}

module.exports = authenticate;