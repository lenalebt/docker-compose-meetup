// Load requirements from libraries
const express = require('express');
const morgan = require('morgan');

// load self written modules
const customer = require('./customer.js');

// initialise the express app
const app = express();
// load the port from the environment vairable or use 3000;
const port = process.env.PORT || 3000;

// use morgan middleware in the common format
app.use(morgan('combined'));

// route definitions
app.get('/customer', customer.get);

// start the service
app.listen(port, function() {
  console.log('Server is running on port ' + port);
});
