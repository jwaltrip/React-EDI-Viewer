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

router.get('/:page', (req, res, next) => {
  // config pagination
  const perPage = 20;
  const currPage = req.params.page || 1;

  EdiDoc.find({})
    .sort({"Luma Order Number": -1})
    .skip((perPage * currPage) - perPage)
    .limit(perPage)
    .exec()
    .then(orders => {
      return res.json({ orders: orders, currentPage: currPage, success: true });
    })
    .catch(err => {
      return res.json({ error: err, success: false });
    })
});

module.exports = router;