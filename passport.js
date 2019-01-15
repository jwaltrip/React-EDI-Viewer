const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
// import Users mongoose model
const User = require("./models/User");

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET || "supersecretdevsecret";

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