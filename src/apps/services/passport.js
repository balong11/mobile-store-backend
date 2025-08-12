const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');
const UserModel = require('../models/User');
const UserOAuthModel = require('../models/UserOAuth');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Google OAuth 2.0
if (config.has('oauth.google.clientID') && config.get('oauth.google.clientID')) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get('oauth.google.clientID'),
        clientSecret: config.get('oauth.google.clientSecret'),
        callbackURL: config.get('oauth.google.callbackURL'),
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const primaryEmail = Array.isArray(profile.emails) && profile.emails.length > 0 ? profile.emails[0].value : null;

          // Try to find existing OAuth link
          let oauthLink = await UserOAuthModel.findOne({ provider: 'google', providerUserId: profile.id });
          let user = null;

          if (oauthLink) {
            user = await UserModel.findById(oauthLink.userId);
          } else {
            // Find or create a user by email
            if (primaryEmail) {
              user = await UserModel.findOne({ email: primaryEmail });
            }
            if (!user) {
              user = await UserModel.create({
                email: primaryEmail || `google_${profile.id}@placeholder.local`,
                password: 'oauth',
                role: 'member',
                full_name: profile.displayName || null,
              });
            }
            oauthLink = await UserOAuthModel.create({
              userId: user._id,
              provider: 'google',
              providerUserId: profile.id,
              accessToken: accessToken || null,
              refreshToken: refreshToken || null,
              profile: profile || {},
            });
          }

          // Update tokens if changed
          const needsTokenUpdate = oauthLink && (oauthLink.accessToken !== accessToken || oauthLink.refreshToken !== refreshToken);
          if (needsTokenUpdate) {
            oauthLink.accessToken = accessToken || oauthLink.accessToken;
            oauthLink.refreshToken = refreshToken || oauthLink.refreshToken;
            await oauthLink.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

// Facebook OAuth 2.0
if (config.has('oauth.facebook.clientID') && config.get('oauth.facebook.clientID')) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.get('oauth.facebook.clientID'),
        clientSecret: config.get('oauth.facebook.clientSecret'),
        callbackURL: config.get('oauth.facebook.callbackURL'),
        profileFields: ['id', 'displayName', 'emails']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const primaryEmail = Array.isArray(profile.emails) && profile.emails.length > 0 ? profile.emails[0].value : null;

          let oauthLink = await UserOAuthModel.findOne({ provider: 'facebook', providerUserId: profile.id });
          let user = null;

          if (oauthLink) {
            user = await UserModel.findById(oauthLink.userId);
          } else {
            if (primaryEmail) {
              user = await UserModel.findOne({ email: primaryEmail });
            }
            if (!user) {
              user = await UserModel.create({
                email: primaryEmail || `facebook_${profile.id}@placeholder.local`,
                password: 'oauth',
                role: 'member',
                full_name: profile.displayName || null,
              });
            }
            oauthLink = await UserOAuthModel.create({
              userId: user._id,
              provider: 'facebook',
              providerUserId: profile.id,
              accessToken: accessToken || null,
              refreshToken: refreshToken || null,
              profile: profile || {},
            });
          }

          const needsTokenUpdate = oauthLink && (oauthLink.accessToken !== accessToken || oauthLink.refreshToken !== refreshToken);
          if (needsTokenUpdate) {
            oauthLink.accessToken = accessToken || oauthLink.accessToken;
            oauthLink.refreshToken = refreshToken || oauthLink.refreshToken;
            await oauthLink.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

module.exports = passport;


