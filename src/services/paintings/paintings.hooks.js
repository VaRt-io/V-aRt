

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [function log(hook){
      console.log('creating', hook.data)
    }],
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
