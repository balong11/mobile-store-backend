const UserModel = require("../models/User");
const SettingModel = require("../models/Setting");

/**
 * Middleware để tự động thêm thông tin user vào res.locals
 * Sử dụng cho tất cả các route cần hiển thị header
 */
const userContext = async (req, res, next) => {
  try {
    // Kiểm tra xem có session email không
    if (req.session && req.session.email) {
      // Lấy thông tin user từ database
      const user = await UserModel.findOne({ email: req.session.email });
      if (user) {
        // Thêm user vào res.locals để tất cả view có thể truy cập
        res.locals.user = user;
      } else {
        res.locals.user = null;
      }
    } else {
      res.locals.user = null;
    }
    
    // Thêm helper function để kiểm tra user có đăng nhập không
    res.locals.isAuthenticated = !!req.session.email;
    
    // Thêm helper function để kiểm tra user có phải admin không
    res.locals.isAdmin = res.locals.user && res.locals.user.role === 1;
    
    // Load global settings for header/footer/logo
    try {
      const setting = await SettingModel.findOne();
      res.locals.setting = setting || null;
    } catch (err) {
      res.locals.setting = null;
    }
    
    next();
  } catch (error) {
    console.error('Error in userContext middleware:', error);
    res.locals.user = null;
    res.locals.isAuthenticated = false;
    res.locals.isAdmin = false;
    next();
  }
};

module.exports = userContext;
