const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

app.use(bodyParser.json({
  limit: '200mb'
}));
app.use(bodyParser.urlencoded({
  limit: '200mb',
  extended: true
}));

// define a simple route
app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to Testing application. "
  });
});


app.listen(process.env.PORT || 5000)

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
  }).catch(err => {
    process.exit();
  });

// Require Notes routes
require('./app/routes/admin.routes.js')(app);


// listen for requests
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
