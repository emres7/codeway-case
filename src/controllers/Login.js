const loginService = require('../services/Login');
const ResponseHandler = require('../utils/ResponseHandler');


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginService.login(username, password);

    return ResponseHandler.handle(res, token);
  } catch(err) {
    return ResponseHandler.handleDefaultError(res, err);
  }
};


module.exports = {
    login
}