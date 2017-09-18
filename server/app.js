require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');


const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(path.join(__dirname, '../dist')));


app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});


app.listen(port);

module.exports = app;
