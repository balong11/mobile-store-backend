//file: config
const session = require("express-session");

module.exports = {
  // Server configuration
  port: 3000,
  // Database configuration
  router: `${__dirname}/../src/routers/web.js`,
  // View folder configuration
  viewFolder: `${__dirname}/../src/apps/views`,
  // View engine configuration
  viewEngine: 'ejs',
  // Static files configuration
  staticFolder: `${__dirname}/../src/public`,
  // Pagination configuration
  limit: 10,
  // Database configuration
  delta: 2,
  // Session configuration
  session: {
    secret: 'longthan_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  },
  // Temporary upload directory(UPLOAD images thư mục tạm thời)
  tmpUpload: `${__dirname}/../src/tmp/`,
  // di chuyển ảnh từ thư mục tạm về thư mục upload/products
  uploads: `${__dirname}/../src/public/uploads/`,

};