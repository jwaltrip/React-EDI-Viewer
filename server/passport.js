const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// import Users mongoose model
// this might need to be required from ./models/Users
// const User = mongoose.model('Users');
const User = require("./models/User");

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
  passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) return done(null, user);

        return done(null, false);
      })
      .catch(err => console.error(err));
  }));
};