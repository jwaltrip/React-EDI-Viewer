const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const userRouteController = require("../controllers/UserRoute.controller");

// POST - /register route
router.post('/register', userRouteController.register);

// POST - /login route
router.post('/login', userRouteController.login);

// GET route - user can only access this route if they have a JWT token stored, otherwise it will redirect to login page
// this is used for protected routes
router.get('/me', passport.authenticate('jwt', { session: false }), userRouteController.userInfo);

module.exports = router;