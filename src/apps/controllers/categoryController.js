const CategoryModel = require("../models/Category");
exports.index = async (req, res) => {
  const categorys = await CategoryModel.find().populate(); 
  return res.render("admin/categorys/category", {categorys});
};
exports.create = (req, res) => {
  res.send("category/create");
};
exports.edit = (req, res) => {
  res.send("category/edit");
};
exports.delete = (req, res) => {
  res.send("category/delete");
};