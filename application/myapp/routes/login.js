/**
 * Team 2
 * CSC 648
 * Description: provides login functionality utilizes passport.js for authentication
 */

const express = require("express");
const app = require("../app");
const router = express.Router();
const passport = require("../middleware/passport");


/**
 * POST /api/login
 * 
 * Request body must be a JSON object containing the keys "username", and "password".
 * Creates a user session on successful authentication (response contains session cookie).
 */


router.post("/", passport.authenticate("local"), (req, res, next) => {
    return res.status(200).send(); 
});



router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.status(200).send()
    });
  });

  module.exports = router;