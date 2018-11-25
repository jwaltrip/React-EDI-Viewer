const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define mongo collection and schema for Post
const PostSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String
  }
}, {
  collection: 'posts'
});

module.exports = mongoose.model('Post', PostSchema);
