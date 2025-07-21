const mongoose = require("../../commom/database")();
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model(
  "Categories",
  categorySchema,
  "categories"
);

module.exports = categoryModel;

