

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
    create: [
      function log(hook) {
        console.log('before hook', hook.data);
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function log(hook) {
        console.log('after hook', hook.data);
      }
    ],
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
