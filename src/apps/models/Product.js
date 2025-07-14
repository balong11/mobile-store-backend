const mongoose = require("../../commom/database")();

const productSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    status: { type: String, required: true },
    featured: { type: Boolean, default: false },
    promotion: { type: String },
    warranty: { type: String },
    accessories: { type: String },
    is_stock: { type: Boolean, default: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Products", productSchema, "products");

module.exports = productModel;
