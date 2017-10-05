const assert = require('assert');
const app = require('../../src/app');

describe('\'galleries\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/galleries');

    assert.ok(service, 'Registered the service');
  });
});
