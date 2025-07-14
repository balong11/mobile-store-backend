const express = require('express');
const bodyParser = require("body-parser");
const config = require('config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static(config.get('staticFolder')))

//config view
app.set('view engine', config.get('viewEngine'));
app.set('views', config.get('viewFolder'));




app.use(require(config.get('router')));
module.exports = app;
