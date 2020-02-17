
// Require the module alias module
require('module-alias/register');

// Using awsServerlessExpress for the route handling
const awsServerlessExpress = require('aws-serverless-express');

// Create a new server
const server = awsServerlessExpress.createServer(require('@root/src/app'), null);

module.exports.index = (event, context) => awsServerlessExpress.proxy(server, event, context);
