// Middleware kiểm tra đăng nhập
exports.checkAdmin = async (req, res, next) => {
  // Ưu tiên session từ đăng nhập thường hoặc OAuth
  if (req.session && req.session.email) {
    return next();
  }
  // Nếu đã đăng nhập qua Passport, đồng bộ email vào session
  if (req.user && req.user.email) {
    req.session.email = req.user.email;
    return next();
  }
  // Kiểm tra cookie ghi nhớ tài khoản (đăng nhập thường)
  if (req.cookies.rememberEmail && req.cookies.rememberPassword) {
    req.session.email = req.cookies.rememberEmail;
    req.session.password = req.cookies.rememberPassword;
    return next();
  }
  return res.redirect('/admin/login');
};

exports.checkLogin = async (req, res, next) => {
  if ((req.session && req.session.email) || (req.user && req.user.email)) {
    return res.redirect('/admin/dashboard');
  }
  // Kiểm tra cookie ghi nhớ
  if (req.cookies.rememberEmail && req.cookies.rememberPassword) {
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