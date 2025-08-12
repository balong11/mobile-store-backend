const mongoose = require("../../commom/database")();

// OAuth accounts linked to a User
const userOAuthSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: ['google', 'facebook'],
      required: true,
      index: true,
    },
    providerUserId: {
      type: String,
      required: true,
      index: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    profile: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

userOAuthSchema.index({ provider: 1, providerUserId: 1 }, { unique: true });

const userOAuthModel = mongoose.model('UserOAuthAccounts', userOAuthSchema, 'user_oauth_accounts');
module.exports = userOAuthModel;


