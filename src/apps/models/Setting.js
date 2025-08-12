const mongoose = require("../../commom/database")();

const settingSchema = new mongoose.Schema(
  {
    site_name: {
      type: String,
      default: "Long Shop",
      trim: true,
    },
    logo: {
      type: String,
      default: "",
      trim: true,
    },
    footer_text: {
      type: String,
      default: "2025 © Long Shop. All rights reserved.",
      trim: true,
    },
  },
  { timestamps: true }
);

const SettingModel = mongoose.model("Settings", settingSchema, "settings");

module.exports = SettingModel;


