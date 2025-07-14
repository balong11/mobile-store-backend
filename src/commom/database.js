//init mongoose
const mongoose = require("mongoose");

//connect to database


//export mongoose
module.exports = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/mobile-store-api")
    .then(() => console.log("Connected!"));
  return mongoose;
};
