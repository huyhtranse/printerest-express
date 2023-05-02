const { checkToken } = require("../config/jwt");

const authentication = (req, res, next) => {
  try {
    let { token } = req.headers;

    checkToken(token);
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { authentication };
