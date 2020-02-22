const AWS = require('aws-sdk');

const {
  AWS_REGION,
  AWS_KEY,
  AWS_SECRET,
  AWS_BUCKET,
} = process.env;

// Create S3 service object
const S3 = new AWS.S3({
  AccessKeyID: AWS_KEY,
  SecretAccessKey: AWS_SECRET,
  Region: AWS_REGION,
});

module.exports.index = (req, res) => {
  const {
    params: {
      name,
    },
  } = req;

  console.log('looking for:', name);

  const tarball = S3.getSignedUrl('getObject', {
    Bucket: AWS_BUCKET,
    Key: `packages/${name}/test-1.0.0.tgz`,
    Expires: 60,
  });

  const response = {
    _id: name,
    _rev: name,
    name,
    'dist-tags': {
      latest: '1.0.0',
    },
    versions: {
      '1.0.0': {
        name: 'test',
        version: '1.0.0',
        description: '',
        main: 'index.js',
        scripts: { test: 'echo "Error: no test specified" && exit 1' },
        author: '',
        license: 'ISC',
        readme: 'ERROR: No README data found!',
        _id: 'test@1.0.0',
        _nodeVersion: '12.16.0',
        _npmVersion: '6.13.4',
        dist: {
          integrity: 'sha512-gEBrqMVQG799Va4Sk5MFC3qAhSpJojnAKa39fU521pk5Nl48X8HXRGlJXnCya3Q5WRXYAKZqcSCPJRhxs9ZDVA==',
          shasum: '525234f31943877a0568b1df440d58139342fa9a',
          tarball,
        },
      },
    },
    time: {
      created: '2019-12-02T14:03:27.976Z',
      modified: '2019-12-02T14:04:06.415Z',
      '1.0.0': '2020-02-02T14:03:28.324Z',
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

  return res
    .status(200)
    .json(response);
};


module.exports.publish = async (req, res) => {
  const {
    body,
  } = req;

  const {
    _id,
    name,
    description,
    'dist-tags': distTags,
    versions,
    readme,
    _attachments,
  } = body;

  console.log(versions);

  const packageFileName = Object.keys(_attachments)[0];

  const { data } = _attachments[packageFileName];

  const packageData = Buffer.from(data, 'base64');

  await S3.putObject({
    Bucket: AWS_BUCKET,
    Key: `packages/${name}/${packageFileName}`,
    Body: packageData,
  }, (response) => {
    console.log(response);
  });

  console.log(_attachments);

  return res.status(200).json({});
};
