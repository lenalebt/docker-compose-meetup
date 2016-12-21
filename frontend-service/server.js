const express = require('express');
const proxy = require('express-http-proxy');

// http://expressjs.com/en/4x/api.html
const app = express();
const port = process.env.PORT || 8080;
const public_path = express.static(__dirname + '/public');
const index_path = __dirname + '/public/index.html';

const liveMode = process.env.app_mode === 'prod' || false;

app.use(public_path);

const proxyConfig = [
  {
    localPath: '/api/customer',
    remotePath: '/customer',
    host: liveMode ? 'http://customer-service' : 'http://localhost:3010'
  }, {
    localPath: '/api/present',
    remotePath: '/present',
    host: liveMode ? 'http://present-service' : 'http://localhost:3020'
  }, {
    localPath: '/api/parcels',
    remotePath: '/parcels',
    host: liveMode ? 'http://parcel-service' : 'http://localhost:3030'
  }
];
// Configure the proxy
proxyConfig.forEach(config => {
  app.use(config.localPath, proxy(config.host, {
    forwardPath: function(req, res) {
      return config.remotePath;
    }
  }));
});

app.get('*', function (request, response) {
  response.sendFile(index_path, function (error) {
    if (error) {
      console.log(error);
    }
  });
});
app.listen(port);
console.log("Listening at http://localhost:" + port);
