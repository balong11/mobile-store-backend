const session = require("express-session");

module.exports = {
  port: 3000,
  router: `${__dirname}/../src/routers/web.js`,
  viewFolder: `${__dirname}/../src/apps/views`,
  viewEngine: 'ejs',
  staticFolder: `${__dirname}/../src/public`,
  limit: 10,
  delta: 2,
  session: {
    secret: 'longthan_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  },
};