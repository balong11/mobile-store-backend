const ProductModel = require("../models/Product");
exports.index = async (req, res) => {
  const products = await ProductModel.find().populate("cat_id");
  return res.render("admin/products/product", { products });
};
exports.create = (req, res) => {
  return res.send("admin/products/product-add");
};
exports.edit = (req, res) => {
  res.send("admin/products/edit");
};
exports.delete = (req, res) => {
  res.send("admin/products/delete");
};