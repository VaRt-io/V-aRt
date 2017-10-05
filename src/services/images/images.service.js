// Initializes the `images` service on path `/images`
const createService = require('./images.class.js');
const hooks = require('./images.hooks');
const filters = require('./images.filters');
const promise = require('bluebird');
const AWS = require('aws-sdk');
const BlobService = require('feathers-blob');
const S3BlobStore = require('s3-blob-store');
const multer = require('multer');
const multipartMiddleware = multer();
const dauria = require('dauria');
const axios = require('axios');

var s3 = promise.promisifyAll(new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_KEY
}));

const blobStore = S3BlobStore({
  client: s3,
  bucket: 'stanky-clams'
});

const blobService = BlobService({
  Model: blobStore
});

module.exports = function () {
  const app = this;
  // const paginate = app.get('paginate');

  const options = {
    name: 'images',
    // paginate
  };

  app.use('s3/images/new',
    // multer parses the file named 'uri'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('uri'),
    // another middleware, this time to
    // transfer the received file to feathers
    function(req, res, next){
      req.feathers.file = req.file;
      next();
    },
    blobService
  );

  app.service('s3/images/new').before({
    create: [
      function(hook) {
        if (!hook.data.uri && hook.params.file){
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = {uri: uri};
        }
        const galleryid = hook.data.galleryid ? hook.data.galleryid.toString() : '0';
        const position = hook.data.position ? hook.data.position.toString() : '0';
        hook.params.s3 = {
          ACL: 'public-read',
          Key: hook.data.name,
          Metadata: {
            galleryid: galleryid,
            position: position
          }
        };
      }
    ]
  });

  // write an after hook that posts to the painting database
  app.service('s3/images/new').after({
    create: [
      function postPainting(hook) {
      console.log('after hook data', hook.data);

      const {name, userId, galleryId, position} = hook.data;
      const host = process.env.HOST || app.get('host');
      const port = process.env.PORT || app.get('port');

      const paintingEndpoint = `http://${host}:${port}/api/paintings`;

        const options = {
            userId: userId,
            galleryId: galleryId,
            position: position || 0,
            url: `s3.amazonaws.com/stanky-clams/${name}`
        };

        // TODO: Add a promise-retry to this in case this does not work
        axios.post(paintingEndpoint, options)
          .then()
          .catch((err) => {
            console.log('fail painting post after s3 upload', err);
          })
      }
    ]
  });

  // Initialize our service with any options it requires
  app.use('/s3/images', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('s3/images');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
