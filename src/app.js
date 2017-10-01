const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const multer = require('multer');
const multipartMiddleware = multer();
const dauria = require('dauria');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const sequelize = require('./sequelize');

const authentication = require('./authentication');

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(sequelize);
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);

const AWS = require('aws-sdk');
const BlobService = require('feathers-blob');
const S3BlobStore = require('s3-blob-store');

// TODO: Add environmental variable support so amazon keys/secrets can be safe while file is still able to be shared
// TODO: Move into the services directory
// S3 Image Service
const s3 = new AWS.S3({
  accessKeyId: 'AKIAI4NXXMVNEKPISIMQ',
  secretAccessKey: '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'
});

const blobStore = S3BlobStore({
  client: s3,
  bucket: 'stanky-clams'
});

const blobService = BlobService({
  Model: blobStore
});

app.use('/s3/images/new',
  // multer parses the file named 'uri'.
  // Without extra params the data is
  // temporarely kept in memory
  multipartMiddleware.single('uri'),
  // another middleware, this time to
  // transfer the received file to feathers
  function(req,res,next){
    req.feathers.file = req.file;
    next();
  },
  blobService
);


app.get('/s3/images', (req, res, next) => {
  const params = {Bucket: 'stanky-clams'};
  s3.listObjects(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const mappedURLs = data.Contents.map((object) => `https://s3.amazonaws.com/clam-images/${object.Key}`);
      res.json(mappedURLs);
    }
  });
});

// before-create Hook to get the file (if there is any)
// and turn it into a datauri,
// transparently getting feathers-blob
// to work with multipart file uploads

// TODO: Add galleryId & position as key-values pairs
app.service('/s3/images/new').before({
  create: [
    function(hook) {
      if (!hook.data.uri && hook.params.file){
        const file = hook.params.file;
        const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
        hook.data = {uri: uri};
      }
      hook.params.s3 = { ACL: 'public-read' };
      console.log(hook.data);
    }
  ]
});

// TODO: programatically get all image urls from a specific gallery (using key value pairs)

// TODO: programatically get a specific image url

// app.get('/s3/images/:name', (req, res, next) => {
//   blobService.get(req.params.name)
//     .then(function (result) {
//       console.log(result);
//       res.json(result);
//     }).catch(function(err) {
//       console.log(err);
//     });
// });

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
