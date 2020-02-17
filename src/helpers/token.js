const jwt = require('jsonwebtoken');
const { secret } = require('@root/config.json');

module.exports.createToken = (tokenData) => jwt.sign(tokenData, secret);
