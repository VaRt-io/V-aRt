const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/users');

    assert.ok(service, 'Registered the service');
  });
});
