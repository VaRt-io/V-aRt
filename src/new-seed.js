const app = require('./app');

app.seed().then((response) => {
  console.log('is there a response?', response);
})
  .catch(console.error);
