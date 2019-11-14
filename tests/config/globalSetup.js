require('@babel/register');

const server = require('../../src/app').default;

module.exports = async () => {
  global.httpServer = server;
  await global.httpServer.listen();
};