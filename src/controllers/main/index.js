module.exports.index = (req, res) => {
  const {
    params: {
      packagename,
    },
    headers: {
      authorization,
    },
  } = req;

  console.log(authorization);

  console.log('looking for:', packagename);

  const response = {
    _id: packagename,
    _rev: packagename,
    name: packagename,
    'dist-tags': {
      latest: '0.1.0',
    },
    versions: {},
    time: {
      created: '2019-12-02T14:03:27.976Z',
      modified: '2019-12-02T14:04:06.415Z',
      '0.1.0': '2019-12-02T14:03:28.324Z',
    },
    maintainers: [
      {
        name: 'daenrebel',
        email: 'daen@index.nl',
      },
    ],
    description: '',
    homepage: '',
    repository: {},
    author: {
      name: 'Daen Rebel',
    },
    license: 'MIT',
    readme: 'ERROR: No README data found!',
    readmeFilename: '',
  };

  // NOT FOUND RESPONSE
  //   return res
  //     .status(404)
  //     .json({
  //       error: 'Not found',
  //     });

  return res
    .status(200)
    .json(response);
};

module.exports.publish = (req, res) => {
  const {
    body,
    headers: {
      authorization,
    },
  } = req;

  console.log(body);
  console.log(authorization);

  return res.status(200).json({});
};
