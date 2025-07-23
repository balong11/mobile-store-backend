const config = require("../../../config/default");
const ProductModel = require("../models/Product");
const paginate = require("../../commom/paginate");
const categoryModel = require("../models/Category");
const slug = require("slug");
const fs = require("fs");


exports.index = async (req, res) => {
  const limit = config.limit;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const totalRows = await ProductModel.countDocuments();
  const totalPage = Math.ceil(totalRows / limit);
  const products = await ProductModel.find().populate({ path: "cat_id" }).sort({ _id: -1 }).skip(skip).limit(limit);

  return res.render("admin/products/product", { 
    products, 
    page,
    paginate: paginate(totalRows, page, limit), 
    prev: page - 1, 
    next: page + 1,
    totalPage: totalPage
    
  });
};
exports.create = async (req, res) => {
  const categories = await categoryModel.find().sort({ _id: 1 });
  return res.render("admin/products/add", { categories } );
};
exports.store = async (req, res) => {
  const body = req.body;
const file = req.file;

const product = {
	name: body.name,
  slug: slug(body.name),
  price: body.price,
  warranty: body.warranty,
  accessories: body.accessories,
  promotion: body.promotion,
  status: body.status,
  cat_id: body.cat_id,
  is_stock: body.is_stock,
  featured: body.featured === "on" || false,
  description: body.description,
};
if(file){
	const originalname = file.originalname;
  const thumbnail = `products/${originalname}`;
  // di chuyển ảnh từ thư mục tạm về thư mục upload/products
	fs.renameSync(file.path, `${config.uploads}/${thumbnail}`);
	product["thumbnail"] = thumbnail;
	await new ProductModel(product).save();
	res.redirect("/admin/products");
}	

};
exports.edit = (req, res) => {
  res.send("admin/products/edit");
};
exports.delete = (req, res) => {
  res.send("admin/products/delete");
};