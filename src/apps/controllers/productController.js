const ProductModel = require("../models/Product");
exports.index = async (req, res) => {
  // const products = await ProductModel.find().populate("cat_id").limit(10);
  const limit = 10;
  const page = req.query.page || 1;
  const skip = page * limit - limit;
  const products = await ProductModel.find().populate({ path : "cat_id"}).sort({_id : -1}).skip(skip).limit(limit);

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