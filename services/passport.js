const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key_google');

var User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy({
      clientID: "820849889489-2l62hgnerhtneg65uuq6lbkehhfgbhg2.apps.googleusercontent.com",
      clientSecret: "oiaSW7ok5pKyIGNz9_7TsLCi",
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id});

      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        _id: new mongoose.Types.ObjectId(),
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.name.familyName + ' ' + profile.name.givenName,
        password: accessToken
      }).save();

      done(null, user);
    })
);