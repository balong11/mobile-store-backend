const express = require('express');
const router = express.Router();
const AuthController = require("../apps/controllers/AuthController.js");
const AdminController = require("../apps/controllers/AdminController.js");
const ProductController = require("../apps/controllers/ProductController.js");
const UserController = require("../apps/controllers/UserController.js");
const CategoryController = require("../apps/controllers/categoryController.js");
const TestController = require("../apps/controllers/test.js");

//test
router.get("/admin/test", TestController.test);


// Auth
router.get("/admin/login", AuthController.getLogin);
router.post("/admin/login", AuthController.postLogin);
router.get("/admin/logout", AuthController.logout);

// Admin
router.get("/admin/dashboard", AdminController.dashboard);

// Product
router.get("/admin/products", ProductController.index);
router.get("/admin/products/create", ProductController.create);
router.get("/admin/products/edit/:id", ProductController.edit);
router.get("/admin/products/delete/:id", ProductController.delete);

// User
router.get("/admin/users", UserController.index);
router.get("/admin/users/create", UserController.create);
router.get("/admin/users/edit/:id", UserController.edit);
router.post("/admin/users/delete/:id", UserController.delete);

// Category
router.get("/admin/categories", CategoryController.index);
router.get("/admin/categories/create", CategoryController.create);
router.get("/admin/categories/edit/:id", CategoryController.edit);
router.get("/admin/categories/delete/:id", CategoryController.delete);

module.exports = router;
