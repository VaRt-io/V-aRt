const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const feathers = require('feathers');
const seeder = require('feathers-seeder');
const seederConfig = require('./seeder-config');
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

// TODO: Write route to serve the canvas file
// app.get('/canvas', (req, res, next) => {
//   // console.log('galleryid is ', req.query.galleryid);
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
// })


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
app.configure(seeder(seederConfig));

// Configure a middleware for 404s and the error handler


app.hooks(appHooks);

app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

app.use(notFound());
app.use(handler());

module.exports = app;
