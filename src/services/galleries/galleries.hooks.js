

module.exports = {
  before: {
    all: [],
    find: [
      function(hook) {
        const sequelize = hook.app.get('sequelizeClient');
        console.log(hook.params.sequelize);
        hook.params.sequelize = {
          include: [{all: true}]
        }
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
