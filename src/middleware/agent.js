const parser = require('ua-parser-js');

module.exports = (req, res, next) => {
  const {
    headers: {
      'user-agent': userAgent,
    },
  } = req;

  const { os, ua } = parser(userAgent);

  const splitUa = ua.split(' ');

  const uaData = splitUa
    .filter((uaSeg) => ['npm', 'node'].some((subStr) => uaSeg.includes(subStr)))
    .map((uaSeg) => {
      const [name, version] = uaSeg.split('/');
      return { name, version };
    });

  req.uaData = [...uaData, os];

  return next();
};
