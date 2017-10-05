const assert = require('assert');
const app = require('../../src/app');

describe('\'images\' service', () => {
  it('registered the service', () => {
    const service = app.service('s3/images');

    assert.ok(service, 'Registered the service');
  });
});
