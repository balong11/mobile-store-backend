const mongoose = require("../../commom/database")();

const productSchema = new mongoose.Schema(
  {
    cat_id: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    accessories: {
      type: String,
      required: true,
    },
    promotion: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    is_stock: {
      type: Boolean,
      default: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Products", productSchema, "products");

module.exports = productModel;
