const assert = require('assert');
const app = require('../../src/app');

describe('\'paintings\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/paintings');

    assert.ok(service, 'Registered the service');
  });
});
