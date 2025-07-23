const express = require('express');
const router = express.Router();
const AuthController = require("../apps/controllers/AuthController.js");
const AdminController = require("../apps/controllers/AdminController.js");
const ProductController = require("../apps/controllers/productController.js");
const UserController = require("../apps/controllers/UserController.js");
const CategoryController = require("../apps/controllers/categoryController.js");
const TestController = require("../apps/controllers/test.js");
const AuthMiddleware = require("../apps/middlewares/auth.js");
const uploadMiddleware = require("../apps/middlewares/upload.js");


//test
router.get("/admin/test", TestController.test);
router.get("/admin/test2", TestController.test2);


// Auth
router.get("/admin/login",AuthMiddleware.checkLogin, AuthController.getLogin);
router.post("/admin/login",AuthMiddleware.checkLogin, AuthController.postLogin);
router.get("/admin/logout",AuthMiddleware.checkAdmin, AuthController.logout);

// Admin
router.get("/admin/dashboard",AuthMiddleware.checkAdmin, AdminController.dashboard);

// Product
router.get("/admin/products",AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create",AuthMiddleware.checkAdmin, ProductController.create);
//them moi thanh cong
router.post("/admin/products/store",AuthMiddleware.checkAdmin,uploadMiddleware.single("thumbnail") , ProductController.store);
router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin, ProductController.edit);
router.get("/admin/products/delete/:id",AuthMiddleware.checkAdmin, ProductController.delete);

// User
router.get("/admin/users",AuthMiddleware.checkAdmin, UserController.index);
router.get("/admin/users/create",AuthMiddleware.checkAdmin, UserController.create);
router.get("/admin/users/edit/:id",AuthMiddleware.checkAdmin, UserController.edit);
router.post("/admin/users/delete/:id",AuthMiddleware.checkAdmin, UserController.delete);

// Category
router.get("/admin/categories",AuthMiddleware.checkAdmin, CategoryController.index);
router.get("/admin/categories/create",AuthMiddleware.checkAdmin, CategoryController.create);
router.get("/admin/categories/edit/:id",AuthMiddleware.checkAdmin, CategoryController.edit);
router.get("/admin/categories/delete/:id",AuthMiddleware.checkAdmin, CategoryController.delete);

module.exports = router;
