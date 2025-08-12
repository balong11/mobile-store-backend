const express = require('express');
const router = express.Router();
const AuthController = require("../apps/controllers/AuthController.js");
const AdminController = require("../apps/controllers/adminController.js");
const ProductController = require("../apps/controllers/productController.js");
const UserController = require("../apps/controllers/userController.js");
const CategoryController = require("../apps/controllers/categoryController.js");
const adsController = require("../apps/controllers/adsController.js");
const CommentController = require("../apps/controllers/commentController.js");
const SettingController = require("../apps/controllers/settingController.js");
const TestController = require("../apps/controllers/test.js");
const AuthMiddleware = require("../apps/middlewares/auth.js");
const passport = require('../apps/services/passport');
const config = require('config');
const uploadMiddleware = require("../apps/middlewares/upload.js");


//test
router.get("/admin/test", TestController.test);
router.get("/admin/test2", TestController.test2);
router.get("/admin/test-middleware", AuthMiddleware.checkAdmin, (req, res) => {
  res.render("admin/test-middleware");
});


// Auth
router.get("/admin/login",AuthMiddleware.checkLogin, AuthController.getLogin);
router.post("/admin/login",AuthMiddleware.checkLogin, AuthController.postLogin);
router.get("/admin/logout",AuthMiddleware.checkAdmin, AuthController.logout);

// OAuth routes (only if configured)
const hasGoogle = config.has('oauth.google.clientID') && !!config.get('oauth.google.clientID');
const hasFacebook = config.has('oauth.facebook.clientID') && !!config.get('oauth.facebook.clientID');

if (hasGoogle) {
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/admin/login' }),
    (req, res) => {
      if (req.user && req.user.email) {
        req.session.email = req.user.email;
      }
      return res.redirect('/admin/dashboard');
    }
  );
}

if (hasFacebook) {
  router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/admin/login' }),
    (req, res) => {
      if (req.user && req.user.email) {
        req.session.email = req.user.email;
      }
      return res.redirect('/admin/dashboard');
    }
  );
}

// Admin
router.get("/admin/dashboard",AuthMiddleware.checkAdmin, AdminController.dashboard);

// Product
router.get("/admin/products",AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create",AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/store",AuthMiddleware.checkAdmin,uploadMiddleware.single("thumbnail") , ProductController.store);
router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin, ProductController.edit);
router.post("/admin/products/update/:id",AuthMiddleware.checkAdmin, uploadMiddleware.single("thumbnail"), ProductController.update);
router.get("/admin/products/delete/:id",AuthMiddleware.checkAdmin, ProductController.delete);

// User
router.get("/admin/users",AuthMiddleware.checkAdmin, UserController.index);
router.get("/admin/users/create",AuthMiddleware.checkAdmin, UserController.create);
router.post("/admin/users/store",AuthMiddleware.checkAdmin, UserController.store);
router.get("/admin/users/edit/:id",AuthMiddleware.checkAdmin, UserController.edit);
router.post("/admin/users/update/:id",AuthMiddleware.checkAdmin, UserController.update);
router.post("/admin/users/delete/:id",AuthMiddleware.checkAdmin, UserController.delete);


// Category
router.get("/admin/categories",AuthMiddleware.checkAdmin, CategoryController.index);
router.get("/admin/categories/create",AuthMiddleware.checkAdmin, CategoryController.create);
router.post("/admin/categories/store",AuthMiddleware.checkAdmin, CategoryController.store);
router.post("/admin/categories/update/:id",AuthMiddleware.checkAdmin, CategoryController.update);
router.get("/admin/categories/edit/:id",AuthMiddleware.checkAdmin, CategoryController.edit);
router.post("/admin/categories/delete/:id",AuthMiddleware.checkAdmin, CategoryController.delete);
// API

//ads
router.get("/admin/ads",AuthMiddleware.checkAdmin, adsController.index);
router.get("/admin/ads/create",AuthMiddleware.checkAdmin, adsController.create);
router.post("/admin/ads/store",AuthMiddleware.checkAdmin, adsController.store);
router.post("/admin/ads/update/:id",AuthMiddleware.checkAdmin, adsController.update);
router.get("/admin/ads/edit/:id",AuthMiddleware.checkAdmin, adsController.edit);
router.post("/admin/ads/delete/:id",AuthMiddleware.checkAdmin, adsController.delete);

// comments
router.get("/admin/comments", AuthMiddleware.checkAdmin, CommentController.index);
router.post("/admin/comments/toggle/:id", AuthMiddleware.checkAdmin, CommentController.toggleStatus);
router.post("/admin/comments/delete/:id", AuthMiddleware.checkAdmin, CommentController.delete);

// settings
router.get("/admin/settings", AuthMiddleware.checkAdmin, SettingController.edit);
router.post(
  "/admin/settings",
  AuthMiddleware.checkAdmin,
  uploadMiddleware.single("logo"),
  SettingController.update
);

router.post(
  "/admin/settings/logo/delete",
  AuthMiddleware.checkAdmin,
  SettingController.deleteLogo
);

module.exports = router;
