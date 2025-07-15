const mongoose = require("../../commom/database")();
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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
