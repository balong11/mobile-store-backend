const User = require("../models/User");

exports.getLogin = (req, res) => {
  return res.render("admin/login", { error: null });
};
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  let error;
  // Kiểm tra thông tin đăng nhập ở đây (ví dụ với UserModel)
  const user = await User.findOne({email: email})
  if (user){
    if (user.password === password){
      req.session.email = user.email;
      req.session.password = user.password;
      // cho truy cap admin
      return res.redirect('/admin/dashboard')
    } else {
      error = "mật khẩu không hợp lệ"
    }
  }else {
    error = "email không hợp lệ"
  }
  return res.render("admin/login", {error})
  
  
};
exports.logout = (req, res) => {
  req.session.destroy();
  return res.send("admin/logout");
};








