const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;
const restrict = [
  authenticate('jwt'),
  // restrictToOwner({
  //   idField: 'id',
  //   ownerField: 'id'
  // })
];

module.exports = {
  before: {
    all: [],
    find: [
      function(hook) {
      const sequelize = hook.app.get('sequelizeClient');
      console.log(sequelize);
      const galleries = sequelize.models.galleries;
      console.log(hook.params.sequelize);
      hook.params.sequelize = {
        include: [{all: true}]
      }
      }
    ],
    // find: [ authenticate('jwt') ],
    // get: [ ...restrict ],
    get: [],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
