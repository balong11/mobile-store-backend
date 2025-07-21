const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const config = require('config');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static(config.get('staticFolder')))

//config view
app.set('view engine', config.get('viewEngine'));
app.set('views', config.get('viewFolder'));


app.set('trust proxy', 1); // trust first proxy
//config session
app.use(session(config.get('session')));







//routers
app.use(require(config.get('router')));
module.exports = app;
