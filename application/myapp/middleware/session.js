module.exports = require("express-session")({
  secret: process.env.USER_SESSION_SECRET,
  cookie: {
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: false
});
