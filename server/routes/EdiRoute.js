const express = require("express");
const router = express.Router();

// import the EdiRoute mongodb model
const EdiDoc = require("../models/EdiDoc");

router.get('/', (req, res, next) => {
  EdiDoc.find({}).limit(25).exec()
    .then((docs) => {
      return res.json({ docs, success: true });
    })
    .catch(err => {
      return res.json({ error: err, success: false });
    })
});

module.exports = router;