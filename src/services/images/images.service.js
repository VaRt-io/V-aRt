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

module.exports = function () {
  const app = this;
  // const paginate = app.get('paginate');

  const options = {
    name: 'images',
    // paginate
  };

  const s3 = promise.promisifyAll(new AWS.S3({
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_KEY
  }));

  const blobStore = S3BlobStore({
    client: s3,
    bucket: app.get('bucket')
  });

  const blobService = BlobService({
    Model: blobStore
  });


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

  // what am i trying to do?

  app.service('s3/images/new').before({
    create: [
      function(hook) {
        if (!hook.data.uri && hook.params.file){
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = {uri: uri};
        }
        const galleryId = hook.data.galleryid ? hook.data.galleryid.toString() : '0';
        const position = hook.data.position ? hook.data.position.toString() : '0';
        const {name, userId} = hook.data;

        hook.params.s3 = {
          ACL: 'public-read',
          Key: hook.data.name,
          Metadata: {
            galleryid: galleryId,
            position: position
          }
        };

        const options = {
          userId: userId,
          galleryId: galleryId,
          position: position || 0,
          url: `s3.amazonaws.com/${app.get('bucket')}/${name}`
        };
        // return hook.app.service('/api/paintings')
        //   .create(options)
        //   .then(result => {
        //     // hook.result.paintingSaved = true;
        //     hook.data.paintingSaved = true;
        //   })
        //   .catch((err) => {
        //     if(process.env.NODE_ENV === 'test') {
        //       throw new Error('failed paintings post');
        //     } else {
        //       // hook.result.paintingSaved = false;
        //       hook.data.paintingSaved = false;
        //       console.log('failed paintings post');
        //     }
        //   });

        hook.data.name = name;
        hook.data.userId = +userId;
        hook.data.galleryId = +galleryId;
        hook.data.position = position
      }
    ]
  });

  // write an after hook that posts to the painting database
  app.service('s3/images/new').after({
    create: [
      function attachHookDataToResults(hook) {
        hook.result.name = hook.data.name;
        hook.result.userId = +hook.data.userId;
        hook.result.galleryId = +hook.data.galleryId;
        hook.result.position = hook.data.position;
        hook.result.paintingSaved = hook.data.paintingSaved;
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
