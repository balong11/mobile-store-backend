const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
exports.dashboard = async (req, res) => {
  const users = await UserModel.find().countDocuments();
  const products = await ProductModel.find().countDocuments();
  return res.render("admin/admin", {
    users,
    products,
  });
};
