const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// app.use(bodyParser.json({
//   limit: '200mb'
// }));
// app.use(bodyParser.urlencoded({
//   limit: '200mb',
//   extended: true
// }));

// define a simple route
app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to Testing application. "
  });
});


app.listen(process.env.PORT || 5000)
