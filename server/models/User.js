const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema for mongodb
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'users'
});

module.exports = mongoose.model('Users', UserSchema);