const { withServiceErrorHandling } = require("../utils/ServiceErrorHandler");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UnauthorizedError } = require("../errors");
dotenv.config();

// Dummy data for logged-in user
// Ideally userdata should be stored in database with hashed 
// password or external service like firebase authentication should be used
const dummy_username = process.env.DUMMY_USERNAME
const dummy_password = process.env.DUMMY_PASSWORD
const access_token = process.env.JWT_SECRET


const login = withServiceErrorHandling(async (username, password) => {
  
    if (username !== dummy_username || password !== dummy_password) {
      return new UnauthorizedError('Invalid credentials.')
    }
  
    const token = JWT.sign({ username: username }, access_token);
    return token
  });

  module.exports = {
    login
  };
  
