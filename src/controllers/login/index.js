const jwtHelper = require('@helpers/jwt');

module.exports.index = (req, res) => res
  .status(401)
  .json({
    error: 'You must be logged in to publish packages.',
  });

module.exports.authenticate = async (req, res) => {
  const {
    body: {
      _id,
      name,
      password,
      type, // Unsure
      roles, // Unsure
      date,
    },
  } = req;

  if (name && password) {
    const token = jwtHelper.createToken({
      type,
      roles,
      date,
      name,
    });

    return res
      .status(201)
      .json({
        token,
        ok: true,
        id: _id,
        rev: '_we_dont_use_revs_any_more',
      });
  }

  return res
    .status(401)
    .json({
      ok: false,
    });
};
