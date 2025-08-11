const User = require("../models/User");

exports.getLogin = async (req, res) => {
  // Kiểm tra cookie để tự động điền thông tin đăng nhập
  const rememberEmail = req.cookies.rememberEmail || '';
  const rememberPassword = req.cookies.rememberPassword || '';
  
  return res.render("admin/login", { 
    error: null, 
    currentPage: 'login',
    rememberEmail,
    rememberPassword
  });
};

exports.postLogin = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  let error;
  
  // Kiểm tra thông tin đăng nhập
  const user = await User.findOne({email: email});
  if (user){
    if (user.password === password){
      req.session.email = user.email;
      req.session.password = user.password;
      
      // Xử lý ghi nhớ tài khoản
      if (rememberMe) {
        // Đặt cookie với thời hạn 30 ngày
        res.cookie('rememberEmail', email, { 
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
          httpOnly: false // Cho phép JavaScript truy cập
        });
        res.cookie('rememberPassword', password, { 
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
          httpOnly: false
        });
      } else {
        // Xóa cookie nếu không chọn ghi nhớ
        res.clearCookie('rememberEmail');
        res.clearCookie('rememberPassword');
      }
      
      // Chuyển hướng đến dashboard
      return res.redirect('/admin/dashboard')
    } else {
      error = "mật khẩu không hợp lệ"
    }
  } else {
    error = "email không hợp lệ"
  }
  
  return res.render("admin/login", {
    error, 
    currentPage: 'login',
    rememberEmail: email,
    rememberPassword: password
  })
};

exports.logout = (req, res) => {
  // Xóa session
  req.session.destroy();
  
  // Xóa cookie ghi nhớ tài khoản
  res.clearCookie('rememberEmail');
  res.clearCookie('rememberPassword');
  
  return res.redirect("/admin/login");
};
