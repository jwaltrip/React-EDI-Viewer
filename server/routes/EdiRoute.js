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
  const perPage = Number(req.query.limit) || 20;
  const currPage = Number(req.params.page) || 1;
  console.log('curr page backend', currPage);

  const queryOpts = {
    sort: { "Luma Order Number": -1 },
    lean: true,
    page: currPage,
    limit: perPage
  };

  EdiDoc.paginate({}, queryOpts)
    .then(result => {
      return res.json({ success: true, result });
    })
    .catch(err => {
      return res.json({ success: false, error: err });
    });
});

// router.get('/:page', (req, res, next) => {
//   // config pagination
//   const perPage = 20;
//   const currPage = req.params.page || 1;
//   console.log('curr page backend', currPage);
//
//   EdiDoc.find({})
//     .sort({"Luma Order Number": -1})
//     .skip((perPage * currPage) - perPage)
//     .limit(perPage)
//     .exec()
//     .then(orders => {
//       return res.json({ orders: orders, currentPage: currPage, success: true });
//     })
//     .catch(err => {
//       return res.json({ error: err, success: false });
//     })
// });

module.exports = router;