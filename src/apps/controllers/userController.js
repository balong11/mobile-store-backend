const UserModel = require("../models/User");
const paginate = require("../../commom/paginate");
const config = require("../../../config/default");

exports.index = async (req, res) => {
  const limit = config.limit;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const totalRows = await UserModel.countDocuments();
  const totalPage = Math.ceil(totalRows / limit);
  const users = await UserModel.find().sort({ _id: -1 }).skip(skip).limit(limit);
  
  return res.render("admin/users/user", { 
    users,
    page,
    paginate: paginate(totalRows, page, limit), 
    prev: page - 1, 
    next: page + 1,
    totalPage: totalPage,
    currentPage: 'users'
  });
}

exports.create = async (req, res) => {
  // Trả về giao diện tạo người dùng mới
  return res.render("admin/users/add", { currentPage: 'users' });
};

exports.store = async (req, res) => {
  const body = req.body;
  
  if (!body) {
    return res.render("admin/users/add", { error: "Không nhận được dữ liệu form!", currentPage: 'users' });
  }
  
  // Kiểm tra password confirmation
  if (body.password !== body.user_re_pass) {
    return res.render("admin/users/add", { error: "Mật khẩu nhập lại không khớp!", currentPage: 'users' });
  }
  
  const userData = {
    full_name: body.full_name,
    email: body.email,
    password: body.password,
    role: parseInt(body.role),
  };
  
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    return res.render("admin/users/add", { error: "Email đã tồn tại!", currentPage: 'users' });
  }
  
  await new UserModel(userData).save();
  res.redirect("/admin/users");
}

exports.edit = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  
  return res.render("admin/users/edit", { user, currentPage: 'users' });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  
  const updateData = {
    full_name: body.full_name,
    email: body.email,
    role: parseInt(body.role),
  };
  
  // Validate role
  if (![1, 2].includes(updateData.role)) {
    return res.render("admin/users/edit", { 
      user: { ...body, _id: id }, 
      error: "Quyền không hợp lệ!",
      currentPage: 'users'
    });
  }
  
  // Chỉ cập nhật password nếu có nhập
  if (body.password && body.password.trim() !== '') {
    if (body.password !== body.user_re_pass) {
      return res.render("admin/users/edit", { 
        user: { ...body, _id: id }, 
        error: "Mật khẩu nhập lại không khớp!",
        currentPage: 'users'
      });
    }
    updateData.password = body.password;
  }
  
  // Kiểm tra email đã tồn tại chưa (trừ user hiện tại)
  const existingUser = await UserModel.findOne({ 
    email: body.email, 
    _id: { $ne: id } 
  });
  
  if (existingUser) {
    return res.render("admin/users/edit", { 
      user: { ...body, _id: id }, 
      error: "Email đã tồn tại!",
      currentPage: 'users'
    });
  }
  
  await UserModel.findByIdAndUpdate(id, updateData);
  res.redirect("/admin/users");
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await UserModel.deleteOne({ _id: id });
  res.redirect("/admin/users");
};