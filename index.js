const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');

app.use(cors());
app.options('*', cors());
app.use(express.json());

//  Connect all our routes to our application
app.use('/', router);
app.listen(3001, function() {
  console.log('Server started successfully. Listening on port 3001');
});