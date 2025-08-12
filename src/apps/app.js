const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const config = require('config');
const userContext = require('./middlewares/userContext');
const passport = require('passport');
require('./services/passport');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Thêm cookie-parser middleware
app.use(cookieParser());

app.use("/static", express.static(config.get('staticFolder')))

//config view
app.set('view engine', config.get('viewEngine'));
app.set('views', config.get('viewFolder'));


app.set('trust proxy', 1); // trust first proxy
//config session
app.use(session(config.get('session')));

// Middleware để tự động thêm thông tin user vào tất cả requests
app.use(userContext);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//routers
app.use(require(config.get('router')));
module.exports = app;