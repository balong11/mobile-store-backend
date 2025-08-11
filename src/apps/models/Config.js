const mongoose = require("../../commom/database")();

const configSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: false,
      default: '/images/default-logo.png'
    },
    logoText: {
      type: String,
      required: false,
      default: 'Mobile Store'
    },
    footer: {
      companyName: {
        type: String,
        required: false,
        default: 'Mobile Store'
      },
      description: {
        type: String,
        required: false,
        default: 'Cửa hàng điện thoại uy tín, chất lượng'
      },
      address: {
        type: String,
        required: false,
        default: '123 Đường ABC, Quận XYZ, TP.HCM'
      },
      phone: {
        type: String,
        required: false,
        default: '0123 456 789'
      },
      email: {
        type: String,
        required: false,
        default: 'info@mobilestore.com'
      },
      facebook: {
        type: String,
        required: false,
        default: 'https://facebook.com/mobilestore'
      },
      instagram: {
        type: String,
        required: false,
        default: 'https://instagram.com/mobilestore'
      },
      youtube: {
        type: String,
        required: false,
        default: 'https://youtube.com/mobilestore'
      }
    },
    contact: {
      hotline: {
        type: String,
        required: false,
        default: '1900 1234'
      },
      supportEmail: {
        type: String,
        required: false,
        default: 'support@mobilestore.com'
      },
      workingHours: {
        type: String,
        required: false,
        default: '8:00 - 22:00 (Thứ 2 - Chủ nhật)'
      }
    },
    seo: {
      title: {
        type: String,
        required: false,
        default: 'Mobile Store - Điện thoại chính hãng, giá tốt'
      },
      description: {
        type: String,
        required: false,
        default: 'Mobile Store cung cấp điện thoại chính hãng với giá tốt nhất, dịch vụ khách hàng tận tâm'
      },
      keywords: {
        type: String,
        required: false,
        default: 'điện thoại, mobile, smartphone, iphone, samsung, xiaomi'
      }
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

const configModel = mongoose.model("Config", configSchema, "configs");

module.exports = configModel; 