const tokenHelper = require('@helpers/token');

module.exports.index = (req, res) => {
  const {
    body: {
      hostname,
    },
    headers: {
      authorization,
    },
  } = req;
  console.log('Test if user is authed');
  console.log('hostname:', hostname);
  console.log('authorization:', authorization);

  return res
    .status(401)
    .json({
      error: 'You must be logged in to publish packages.',
    });
};

module.exports.authenticate = async (req, res) => {
  const {
    body: {
      _id,
      name,
      password,
      email,
      type, // Unsure
      roles, // Unsure
      date,
    },
    headers: {
      authorization,
    }, // Check node version and npm version
  } = req;

  console.log('authorization:', authorization);

  if (name === 'admin' && password === '123123') {
    const token = tokenHelper.createToken({
      email,
      type,
      roles,
      date,
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
