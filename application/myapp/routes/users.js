/**
 * Team 2
 * CSC 648
 * Description: provides functions for accessing and 
 *  manipulating user data stored in database
 */
var express = require('express');
var router = express.Router();
const Joi = require("joi");
const UserManager = require("../managers/UserManager");
const ApiClientError = require("../errors/ApiClientError");
const ApiNotFoundError = require("../errors/ApiNotFoundError");
const ApiUnauthorizedError = require("../errors/ApiUnauthorizedError");
const passport = require("../middleware/passport");
const db = require('../conf/databseSetup');
const ApiForbiddenError = require('../errors/ApiForbiddenError');


/**
 * GET /api/users/current
 * Retrieve currently logged in user.
 */
router.get("/current", passport.session(), async (req, res, next) => {
  try {
    if (!req.user) {
   //    throw new ApiUnauthorizedError("Not logged in.");
      return res.status(204).send()
    } else{
    [rows] = req.user;
    console.log(req.user)
    return res.status(200).send(rows[0])
    }
  } catch (e) {
    next(e);
  }
});

router.get("/currentUserDate", async (req, res, next) => {
  try {

    const schema = Joi.string().email().max(45).required();

    const validated = await schema.validateAsync(req.query.email);

    const queryPrompt = `SELECT date_time FROM Users WHERE email = '${validated}';`

    console.log(queryPrompt)
    const user = await db.query(queryPrompt)
    .then(([rows]) => {
      return rows[0];
    })
    return res.status(200).send(user);

  } catch (e) {
    next(e);
  }
})
/**
 * GET /api/users/id/:userId
 * Retrieve user by user ID.
 */
router.get("/id/:userId", async (req, res, next) => {
  try {
    const {
      userId,
    } = req.params;

    // Verify request parameters
    if (isNaN(userId)) {
      throw new ApiClientError(`'${userId}' is not a valid user ID.`);
    }

    // Fetch user
    const user = await UserManager.getUserById(userId);
    if (!user) {
      throw new ApiNotFoundError(`A user with id "${userId}" does not exist.`);
    }

    return res.status(200).json({
      user: user,
    });
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/users
 * Create (register) a user with given username, password, and email.
 *
 * Request body must be a JSON object containing the keys "username", "password", and "email".
 */
router.post("/", async (req, res, next) => {
  try {
    // Verify request body has all required properties and has correct format
    const schema = Joi.object({
      email: Joi.string().email().max(45).required(),
      password: Joi.string().min(6).max(80).required()
    });

    const validated = await schema.validateAsync(req.body);

    if(validated.email.includes("sfsu.edu") == false){
      return res.status(400).json({
        success: false,
        message: "must be an SFSU email"
      }).send()
    }
    // Create user
    await UserManager.createUser(validated.password, validated.email);

    return res.status(200).send();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
});

// POST /api/users/changepassword
// have front end fetch user first then fetch post
// requires email, old password, new password
router.post("/changepassword", async (req, res, next) => {
  try {
    const schema = Joi.object({
      old_password: Joi.string().min(6).max(80).required(),
      new_password: Joi.string().min(6).max(80).required()
    });

    const validated = await schema.validateAsync(req.body);
    
    UserManager.changePassword(req.user[0][0].email, validated.new_password, validated.old_password);
    

    return res.status(200).send();
  } catch (e) {
    next(e)
  }
});
// POST /api/users/changeemail
// requires old_email new email and users password
router.post("/changeemail", async (req, res, next) => {
  try {
    const schema = Joi.object({
      new_email: Joi.string().email().max(45).required(),
      password: Joi.string().min(6).max(80).required()
    });

    const validated = await schema.validateAsync(req.body);
    if(validated.new_email.includes("sfsu.edu") == false){
      return res.status(400).json({
        success: false,
        message: "must be an SFSU email"
      }).send()
    }

    await UserManager.changeEmail(req.user[0][0].email, validated.new_email, validated.password);

    return res.status(200).send();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
});




// GEts all posts associated with user email
// GET /api/users/getAllPosts/
// requires users email
//send in body

router.get("/getAllPosts", async (req, res, next) => {
    try {
      const schema = Joi.string().email().max(45).required();
  
      const validated = await schema.validateAsync(req.query.email);

    const queryPrompt = `SELECT * FROM Posts WHERE email = '${validated}';`
    console.log(queryPrompt)
    const posts = await db.query(queryPrompt)
      .then(([rows]) => {
        return rows;
      })


    return res.status(200).send(posts)
  } catch (e) {
    next(e)
  }
})


module.exports = router;