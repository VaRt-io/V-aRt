// Initializes the `paintings` service on path `/paintings`
const createService = require('feathers-sequelize');
const createModel = require('../../models/paintings.model');
const hooks = require('./paintings.hooks');
const filters = require('./paintings.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'paintings',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/paintings', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/paintings');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
