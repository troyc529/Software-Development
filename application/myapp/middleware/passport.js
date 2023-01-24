/**
 * Team 2
 * CSC 648
 * Description: user authentication functions
 */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserManager = require("../managers/UserManager");
const ApiUnauthorizedError = require("../errors/ApiUnauthorizedError");

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await UserManager.loginUser(username, password);
      if (!user) {
        return done(new ApiUnauthorizedError("Invalid username or password."));
      }
      return done(null, user);
    } catch(e) {
      return done(e);
    }
  }
));

passport.serializeUser((user, cb) => {
  try {
    return cb(null, user);
  } catch(e) {
    return cb(e);
  }
});

passport.deserializeUser((user, cb) => {
  try {
    return cb(null, user);
  } catch(e) {
    return cb(e);
  }
});

module.exports = passport;