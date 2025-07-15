const UserModel = require("../models/User");
const ProductModel = require("../models/Product");
exports.dashboard = async (req, res) => {
  const users = await UserModel.find().countDocuments();
  const products = await ProductModel.find().countDocuments();
  return res.render("admin/admin", {
    users,
    products,
  });
};
