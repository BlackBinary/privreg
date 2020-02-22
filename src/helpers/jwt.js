const jwt = require('jsonwebtoken');

const {
  JWT_SECRET,
} = process.env;

module.exports.bearerType = 'Bearer';
module.exports.options = {
  expiresIn: '1y',
};

module.exports.createToken = (tokenData) => jwt.sign(
  tokenData,
  JWT_SECRET,
  this.options,
);

module.exports.parseBearer = (bearer) => {
  const [type, token] = bearer.split(' ');

  if (type !== this.bearerType) {
    return false;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return false;
  }
};
