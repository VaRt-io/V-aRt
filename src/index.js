/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = process.env.PORT || app.get('port');
// const server = app.listen(port);

app.seed().then(() => {
  const server = app.listen(port);
  server.on('listening', () =>
  logger.info('Feathers application loaded on http://%s:%d', process.env.HOST || app.get('host'), port)
);
  
  // ...
}).catch(err => {
  console.log(err);
});

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

// server.on('listening', () =>
//   logger.info('Feathers application started on http://%s:%d', process.env.HOST || app.get('host'), port)
// );
