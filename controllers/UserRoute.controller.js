const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// import User mongodb model
const User = require("../models/User");

module.exports = {

  // POST - /register route
  register: (req, res) => {
    // use the validateRegisterInput fn to process the data in req.body and return any errors and if input isValid
    const { errors, isValid } = validateRegisterInput(req.body);
    // if invalid input, return the errors in JSON format
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({
      email: req.body.email
    }).then(user => {
      // if found a user, return error saying user already has registered
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        });
      }
      else {
        // create gravatar based on email text
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        // create new User model, hash+salt the password, and save to DB
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });
        // encrypt the password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error encrypting password", err);
          else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error("There was an error encrypting password", err);
              else {
                newUser.password = hash;
                // save newUser to DB
                newUser.save()
                  .then(user => {
                    // on successful save, return the user json obj
                    return res.json(user);
                  });
              }
            });
          }
        });
      }
    });
  },

  // POST - /login route
  login: (req, res) => {
    // use the validateLoginInput fn to process the data in req.body and return any errors and if input isValid
    const { errors, isValid } = validateLoginInput(req.body);
    // if invalid input, return errors in json obj
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
      .then(user => {
        // if user not found, then return errors
        if (!user) {
          errors.email = 'User not found';
          return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              };

              // create and sign the JWT token
              jwt.sign(payload, 'secret', {
                expiresIn: 3600
              }, (err, token) => {
                if (err) console.error("There is an error with token", err);
                else {
                  // return the jwt token
                  return res.json({
                    success: true,
                    token: `Bearer ${token}`
                  });
                }
              });
            }
            // else passwords do NOT match
            else {
              errors.password = 'Incorrect password';
              return res.status(400).json(errors);
            }
          });
      });
  },

  // GET route - user can only access this route if they have a JWT token stored, otherwise it will redirect to login page
  // this is used for protected routes
  userInfo: (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }

};