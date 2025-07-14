const mongoose = require("../../commom/database")();

// Tạo bản thiết kế user (User Schema)
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Tạo model user từ bản thiết kế
const userModel = mongoose.model("Users", userSchema, "users");

module.exports = userModel;
