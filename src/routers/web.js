const express = require('express');
const router = express.Router();
const AuthController = require("../apps/controllers/authController.js");
const AdminController = require("../apps/controllers/adminController.js");
const ProductController = require("../apps/controllers/productController.js");
const UserController = require("../apps/controllers/userController.js");
const CategoryController = require("../apps/controllers/categoryController.js");
const adsController = require("../apps/controllers/adsController.js");
const CommentController = require("../apps/controllers/commentController.js");
const ConfigController = require("../apps/controllers/configController.js");
const TestController = require("../apps/controllers/test.js");
const AuthMiddleware = require("../apps/middlewares/auth.js");
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

// Config
router.get("/admin/configs", AuthMiddleware.checkAdmin, ConfigController.getAllConfigs);
router.get("/admin/configs/add", AuthMiddleware.checkAdmin, ConfigController.showAddForm);
router.post("/admin/configs/add", AuthMiddleware.checkAdmin, uploadMiddleware.single("logo"), ConfigController.addConfig);
router.get("/admin/configs/edit/:id", AuthMiddleware.checkAdmin, ConfigController.showEditForm);
router.post("/admin/configs/edit/:id", AuthMiddleware.checkAdmin, uploadMiddleware.single("logo"), ConfigController.updateConfig);
router.post("/admin/configs/delete/:id", AuthMiddleware.checkAdmin, ConfigController.deleteConfig);
router.post("/admin/configs/toggle-status/:id", AuthMiddleware.checkAdmin, ConfigController.toggleStatus);

// API Config
router.get("/api/config", ConfigController.getCurrentConfig);

module.exports = router;
