const express = require("express");
const router = express.Router();

// import the Post mongodb model
const Post = require("../models/Post");

// GET - gets all posts from DB
router.get('/', (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log("Error retreiving posts from DB"+ err);
    }

    res.json(posts);
  });
});

// POST route - add a post to the DB
router.post('/add', (req, res, next) => {
  // create a new post from mongoose model contructor based on req.body
  const post = new Post(req.body);
  // save post to DB
  post.save()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(400).send("Unable to save post to DB"+ err);
    });
});

// GET route - delete post based on _id
router.get('/delete/:id', (req, res, next) => {
  Post.findByIdAndRemove({ _id: req.params.id }, (err, post) => {
    if (err) {
      res.json(err);
    } else {
      res.json(req.params.id);
    }
  });
});

module.exports = router;