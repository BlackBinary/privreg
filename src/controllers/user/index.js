module.exports.index = (req, res) => {
  console.log(req.auth);
  return res
    .status(200)
    .json({
      tfa: false,
      name: 'daenrebel',
      email: 'daen@index.nl',
      email_verified: true,
      created: '2019-11-11T21:16:52.167Z',
      updated: '2019-11-12T07:51:22.004Z',
      cidr_whitelist: null,
      fullname: 'Daen Rebel',
      twitter: 'daenrebel',
      github: 'blackbinary',
    });
};

module.exports.update = (req, res) => {
  console.log(req.body);
  const {
    email,
    fullname,
    freenode,
    twitter,
    github,
  } = req.body;
};

module.exports.whoami = (req, res) => {
  const { name } = req.auth;

  return res
    .status(200)
    .json({
      username: name,
    });
};
