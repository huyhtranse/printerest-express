const jwt = require("jsonwebtoken");

const createToken = (data) => {
  let token = jwt.sign({ data }, "key", {
    expiresIn: "7d",
  });

  return token;
};

const checkToken = (token) => {
    let verifyToken = jwt.verify(token, 'key');

    return verifyToken;
};

const descriptToken = (token) => {
  return jwt.verify(token, 'key');
};

module.exports = {
  createToken,
  checkToken,
  descriptToken,
};
