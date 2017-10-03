const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const promise = require('bluebird');

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

app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

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

// const AWS = require('aws-sdk');
const AWS = require('aws-sdk');
const BlobService = require('feathers-blob');
const S3BlobStore = require('s3-blob-store');

// TODO: Move into the services directory
// S3 Image Service
var s3 = promise.promisifyAll(new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_KEY
}));
// s3 =

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


// app.get('/s3/images', (req, res, next) => {
//   const params = {Bucket: 'stanky-clams'};
//   s3.listObjects(params, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(data);
//       const mappedURLs = data.Contents.map((object) => `https://s3.amazonaws.com/stanky-clams/${object.Key}`);
//       // res.json(mappedURLs);
//     }
//   });
// });


app.get('/s3/images', (req, res, next) => {
  const params = {Bucket: 'stanky-clams'};

  var resultantArr = [];
  var objectKeys = [];
  // TODO: Write a better comment
  // Fetch list of objects in bucket
  // Make an http request for the head of each object
  // If there is a galleryid query param, filter the head objects by the specified gallery id
  // Else construct urls consisting of the galleryid and position

  s3.listObjectsAsync(params)
    .then((data) => {
      objectKeys = data.Contents;
      return data.Contents.map((object) => s3.headObjectAsync({Bucket: 'stanky-clams', Key: object.Key}));
    })
    .then((allObjectHeadPromises) => Promise.all(allObjectHeadPromises))
    .then((allObjectHeads) => {
      if (req.query.hasOwnProperty('galleryid')) {
        return allObjectHeads.filter((objectHead) => {
          if (objectHead.Metadata.hasOwnProperty('galleryid') && objectHead.Metadata.hasOwnProperty('position')) {
            return objectHead.Metadata.galleryid === req.query.galleryid;
          }
        });
      } else {
        allObjectHeads.forEach((headObject) => {
          objectKeys.forEach((objectKey) => {
            if (headObject.LastModified.toString() === objectKey.LastModified.toString()) {
              resultantArr.push({url:`https://s3.amazonaws.com/stanky-clams/${objectKey.Key}`, position: headObject.Metadata.position, galleryid: headObject.Metadata.galleryid});
            }
          });
        });
        res.json(resultantArr);
      }
    })
    .then((filteredObjects) => {
      filteredObjects.forEach((filteredObject) => {
        objectKeys.forEach((objectKey) => {
          if (filteredObject.LastModified.toString() === objectKey.LastModified.toString()) {
            resultantArr.push({url:`https://s3.amazonaws.com/stanky-clams/${objectKey.Key}`, position: filteredObject.Metadata.position, galleryid: filteredObject.Metadata.galleryid});
          }
        });
      });
      res.json(resultantArr);
    })
    .catch((err) => {
      if (err.message !== 'Cannot read property \'forEach\' of undefined') {
        console.log(err);
      }

    });
});

// before-create Hook to get the file (if there is any)
// and turn it into a datauri,
// transparently getting feathers-blob
// to work with multipart file uploads

// TODO: Add galleryId & position as key-values pairs
// TODO:
app.service('/s3/images/new').before({
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
      const position = hook.data.position ? hook.data.position.toString() : '0'
      hook.params.s3 = {
        ACL: 'public-read',
        Key: hook.data.name,
        Metadata: {
          'galleryid': galleryid,
          'position': position
        }
      };
      // hook.params.name = hook.data.name;
      // hook.params.position = hook.data.position;
      // hook.params.galleryId = hook.data.galleryId;
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
