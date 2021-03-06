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
      function rawFalse(hook) {
        if (!hook.params.sequelize) hook.params.sequelize = {};
        Object.assign(hook.params.sequelize, { raw: false, include: [{all: true, nested: true}] });
        return hook;
      }
    ],
    // find: [ authenticate('jwt') ],
    // get: [ ...restrict ],
    get: [],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    // TODO: Put restrict hook back in this
    patch: [ hashPassword() ],
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
