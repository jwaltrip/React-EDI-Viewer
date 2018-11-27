const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/DB");

const app = express();

// initialize passport
app.use(passport.initialize());
require("./passport")(passport);

// setup mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log("Database is connected") },
  (err) => { console.log("Cannot connect to the database"+ err) }
);

// import routes
const userRoutes = require("./routes/UserRoute");
const postRoutes = require("./routes/PostRoute");

// setup middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

// set the backend server port
const port = process.env.PORT || 5000;

// setup routes
app.use('/api/users', userRoutes);
app.use('/posts', postRoutes);

const server = app.listen(port, () => {
  console.log(`Backend server running and listening on port ${port}`);
});
