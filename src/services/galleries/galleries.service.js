// Initializes the `galleries` service on path `/galleries`
const createService = require('feathers-sequelize');
const createModel = require('../../models/galleries.model');
const hooks = require('./galleries.hooks');
const filters = require('./galleries.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'galleries',
    Model,
    // paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/galleries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('galleries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
