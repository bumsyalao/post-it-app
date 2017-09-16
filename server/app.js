require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');


const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve bundled client files


// Root API endpoint
app.use('/', routes);
app.use(express.static(path.join(__dirname, '../client/src/build/')));


app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/client/src/build/index.html`);
});


app.listen(port);

module.exports = app;
