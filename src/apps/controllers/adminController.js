const UserModel = require("../models/User");
const ProductModel = require("../models/Product");

exports.dashboard = async (req, res) => {
  // Kiểm tra quyền truy cập
  
  const users = await UserModel.find().countDocuments();
  const products = await ProductModel.find().countDocuments();
  
  // Lấy thông tin user hiện tại
  const currentUser = await UserModel.findOne({ 
    email: req.session.email 
  });
  
  return res.render("admin/admin", {
    users,
    products,
    currentUser,
    currentPage: 'dashboard'
  });
};