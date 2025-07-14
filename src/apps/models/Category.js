const mongoose = require("../../commom/database")();
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model(
  "Categories",
  categorySchema,
  "categories"
);

module.exports = categoryModel;
