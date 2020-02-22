const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');

const agentMiddleware = require('@middleware/agent');
const authenticationMiddleware = require('@middleware/authentication');

const app = express();
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

// router.use((req, res, next) => {
//   console.log('Time:    ', Date.now());
//   console.log('Headers: ', req.headers);
//   next();
// });

router.use(agentMiddleware);

router.all('/proxy/*', require('@controllers/mitm').index);

// Package routes
router.get(
  '/:name',
  require('@controllers/main').index,
);
router.put(
  '/:name',
  require('@controllers/main').publish,
);

// Search routes
router.get(
  '/-/v1/search',
  require('@controllers/search').index,
);

// Authentication routes
router.post(
  '/-/v1/login',
  require('@controllers/login').index,
);
router.put(
  '/-/user/org.couchdb.user::name',
  require('@controllers/login').authenticate,
);

// User routes
router.use(authenticationMiddleware);
router.get(
  '/-/npm/v1/user',
  require('@controllers/user').index,
);
router.post(
  '/-/npm/v1/user',
  require('@controllers/user').update,
);
router.get(
  '/-/whoami',
  require('@controllers/user').whoami,
);

app.use('/', router);

module.exports = app;
