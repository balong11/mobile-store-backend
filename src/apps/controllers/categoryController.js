const CategoryModel = require("../models/Category");
const paginate = require("../../commom/paginate");
const slug = require("slug");

exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const categorys = await CategoryModel.find().skip(skip).limit(limit);
  const count = await CategoryModel.countDocuments();
  const totalPage = Math.ceil(count / limit);
  const prev = page - 1;
  const next = page + 1;
  const paginateData = paginate(count, page, limit);
  
  return res.render("admin/categorys/category", {
    categorys, 
    totalPage, 
    page,
    prev,
    next,
    paginate: paginateData,
    currentPage: 'categories'
  });
};

exports.create = async (req, res) => {
  const categories = await CategoryModel.find().sort({ _id: 1 });
  
  return res.render("admin/categorys/add", { categories, error: null, currentPage: 'categories' });
};

exports.store = async (req, res) => {
  const { cat_name } = req.body;
  const category = await CategoryModel.findOne({ title: cat_name });
  if (category) {
    return res.render("admin/categorys/add", { error: "Danh mục đã tồn tại!", currentPage: 'categories' });
  }
  
  // Tạo slug từ tên danh mục
  const categorySlug = slug(cat_name);
  
  await CategoryModel.create({ 
    title: cat_name,
    slug: categorySlug
  });
  return res.redirect("/admin/categories");
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  
  return res.render("admin/categorys/edit", { category, error: null, currentPage: 'categories' });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { cat_name } = req.body;
  
  // Check if category with same name already exists (excluding current category)
  const existingCategory = await CategoryModel.findOne({ 
    title: cat_name, 
    _id: { $ne: id } 
  });
  
  if (existingCategory) {
    return res.render("admin/categorys/edit", { 
      category: { _id: id, title: cat_name },
      error: "Danh mục đã tồn tại!",
      currentPage: 'categories'
    });
  }
  
  // Tạo slug từ tên danh mục
  const categorySlug = slug(cat_name);
  
  await CategoryModel.findByIdAndUpdate(id, { 
    title: cat_name,
    slug: categorySlug
  });
  return res.redirect("/admin/categories");
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await CategoryModel.findByIdAndDelete(id);
  return res.redirect("/admin/categories");
};
