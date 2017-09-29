const assert = require('assert');
const app = require('../../src/app');

describe('\'galleries\' service', () => {
  it('registered the service', () => {
    const service = app.service('galleries');

    assert.ok(service, 'Registered the service');
  });
});
