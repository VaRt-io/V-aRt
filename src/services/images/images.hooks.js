const dauria = require('dauria');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      function(hook) {
        if (!hook.data.uri && hook.params.file){
          console.log('got here');
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = {uri: uri};
        }
        console.log('does this run?', hook.data.test);
        const galleryid = hook.data.galleryid ? hook.data.galleryid.toString() : '0';
        const position = hook.data.position ? hook.data.position.toString() : '0';
        hook.params.s3 = {
          ACL: 'public-read',
          Key: hook.data.name,
          Metadata: {
            'galleryid': galleryid,
            'position': position
          }
        };
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
