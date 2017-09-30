const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// feathers-blob service
const {getBase64DataURI} = require('dauria');
const AWS = require('aws-sdk');
const S3BlobStore = require('s3-blob-store');
const BlobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
// const fs = require('fs-blob-store');
// const blobStorage = fs(__dirname + '/uploads');


const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
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


// Upload Service
// app.use('/uploads', BlobService({Model: blobStorage}));

// S3 Image Service
const s3 = new AWS.S3({
  accessKeyId: 'AKIAI4NXXMVNEKPISIMQ',
  secretAccessKey: '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'
});

// const blobStore = S3BlobStore({
//   client: s3,
//   bucket: 'stanky-clams'
// });

// const blobService = BlobService({
//   Model: blobStore
// });
// TODO: programatically create blob and store galleryId & position as key-values pairs

// app.put('/s3/galleries/:id', (req, res, next) => {
//   const params = {Bucket: 'stanky-clams', Key: `${req.params.id}/aword`, ACL: 'public-read', Body: 'Hello World!'};
//   s3.upload(params, function(err, data) {
//     if (err)
//       console.log(err);
//     else
//       console.log('Successfully uploaded data to ' + params.Bucket + '/' + params.Key);
//     res.json(data);
//   });
// });

// TODO: programatically get all image urls (currently this is get all objects)

app.get('/s3/images', (req, res, next) => {
  const params = {Bucket: 'stanky-clams'};
  s3.listObjects(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('got objects', data);
      res.json(data);
    }
  });
})

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
