// Middleware kiểm tra đăng nhập
exports.checkAdmin = async (req, res, next) => {
  if (!req.session.email || !req.session.password) {
    // Kiểm tra cookie ghi nhớ tài khoản
    if (req.cookies.rememberEmail && req.cookies.rememberPassword) {
      // Tự động đăng nhập từ cookie
      req.session.email = req.cookies.rememberEmail;
      req.session.password = req.cookies.rememberPassword;
      return next();
    }
    return res.redirect('/admin/login');
  }
  next();
};

exports.checkLogin = async (req, res, next) => {
  if (req.session.email || req.session.password) {
    return res.redirect('/admin/dashboard');
  }
  // Kiểm tra cookie ghi nhớ
  if (req.cookies.rememberEmail && req.cookies.rememberPassword) {
    return res.redirect('/admin/dashboard');
  }
  next();
};

// Middleware kiểm tra quyền admin (ví dụ)
exports.adminRequired = (req, res, next) => {
  if (!req.session || req.session.role !== 'admin') {
    return res.status(403).send('Bạn không có quyền truy cập!');
  }
  next();
};