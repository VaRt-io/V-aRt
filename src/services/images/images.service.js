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

// const blobStore = S3BlobStore({
//   client: s3,
//   bucket: 'stanky-clams'
// });
//
// const blobService = BlobService({
//   Model: blobStore
// });

module.exports = function () {
  const app = this;
  // const paginate = app.get('paginate');

  const options = {
    name: 'images',
    // paginate
  };

  // app.use('/images',
  //   // multer parses the file named 'uri'.
  //   // Without extra params the data is
  //   // temporarely kept in memory
  //   multipartMiddleware.single('uri'),
  //   // another middleware, this time to
  //   // transfer the received file to feathers
  //   function(req,res,next){
  //     req.feathers.file = req.file;
  //     next();
  //   },
  //   blobService
  // );

  // Initialize our service with any options it requires
  app.use('/images', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('images');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
