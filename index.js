const express = require('express');
const app = express();
const router = require('./routes');

//  Connect all our routes to our application
app.use('/', router);

app.listen(3001, function() {
  console.log('Serving on port 3001');
});