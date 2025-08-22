const mongoose = require("../../commom/database")();

const adsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
      enum: ["slider", "banner"],
      default: 'banner'
    },
    status: {
      type: String,
      required: true,
      enum: ['on', 'off'],
      default: 'on'
    },
    image: {
      type: String,
      default: null
    },

  },
  { timestamps: true }
);

const adsModel = mongoose.model("Ads", adsSchema, "ads");

module.exports = adsModel;
