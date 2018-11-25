const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/DB");

const app = express();

// setup mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => { console.log("Database is connected") },
  (err) => { console.log("Cannot connect to the database"+ err) }
);

// import routes
const postRoutes = require("./routes/PostRoute");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

// set the backend server port
const port = process.env.PORT || 4000;

// setup routes
app.use('/posts', postRoutes);

const server = app.listen(port, () => {
  console.log(`Backend server running and listening on port ${port}`);
});
