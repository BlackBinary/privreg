const jwtHelper = require('@helpers/jwt');

module.exports = (req, res, next) => {
  const {
    headers: {
      authorization,
    },
  } = req;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to publish packages.' });
  }

  const parsedBearer = jwtHelper.parseBearer(authorization);

  if (!parsedBearer) {
    return res
      .status(401)
      .json({});
  }

  req.auth = parsedBearer;

  return next();
};
