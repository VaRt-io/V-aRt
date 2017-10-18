

module.exports = {
  before: {
    all: [],
    find: [
      function rawFalse(hook) {
        if (!hook.params.sequelize) hook.params.sequelize = {};
        Object.assign(hook.params.sequelize, { raw: false, include: [{all: true}] });
        return hook;
      }
    ],
    get: [],
    create: [],
    update: [(hook) => console.log(hook.data)],
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
