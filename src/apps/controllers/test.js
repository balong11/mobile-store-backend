const User = require("../models/User");
const categoryModel = require("../models/Category");
const productModel = require("../models/Product");
exports.test = async (req, res) => {
  req.session.email = "admin@gamil.com";
  res.send("Test12");
  

};
exports.test2 = async (req, res) => {
  res.send("test2");
  

};
