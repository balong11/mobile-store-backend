// Middleware kiểm tra đăng nhập
exports.checkAdmin = async (req, res, next) => {
  if (!req.session.email || !req.session.password) {
    return res.redirect('/admin/login');
  }
  next();
};

exports.checkLogin = async (req, res, next) => {
  if (req.session.email || req.session.password) {
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