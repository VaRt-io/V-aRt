const users = require('./users/users.service.js');
const galleries = require('./galleries/galleries.service.js');
const images = require('./images/images.service.js');
const paintings = require('./paintings/paintings.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(galleries);
  app.configure(images);
  app.configure(paintings);
};
