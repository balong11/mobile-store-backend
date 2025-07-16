const config = require("../../../config/default");
const ProductModel = require("../models/Product");
const paginate = require("../../commom/paginate");
exports.index = async (req, res) => {
  const limit = config.limit;
  const page = req.query.page || 1;
  const skip = page * limit - limit;
  const totalPage = Math.ceil(totalRows / limit);
  const totalRows = await ProductModel.countDocuments();
  const products = await ProductModel.find().populate({ path: "cat_id" }).sort({ _id: -1 }).skip(skip).limit(limit);

  return res.render("admin/products/product", { 
    products, 
    paginate: paginate(totalRows, page, limit), 
    prev: page - 1, 
    next: page + 1,
    totalPage
  });
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