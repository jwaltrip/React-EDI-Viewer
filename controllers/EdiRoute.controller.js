// import the EdiRoute mongodb model
const EdiDoc = require("../models/EdiDoc");

module.exports = {

  // returns all orders
  index: (req, res) => {
    EdiDoc.find({}).exec()
      .then((docs) => {
        return res.json({ docs, success: true });
      })
      .catch(err => {
        return res.json({ error: err, success: false });
      });
  },

  // returns paginated orders
  page: (req, res) => {
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
  },

  // search route with pagination
  search: (req, res) => {
    const searchTerm = String(req.params.searchTerm).trim().toUpperCase();
    const perPage = Number(req.query.limit) || 20;
    const currPage = Number(req.query.page) || 1;

    const queryOpts = {
      sort: { "Luma Order Number": -1 },
      lean: true,
      page: currPage,
      limit: perPage
    };

    EdiDoc.paginate({ "Search": searchTerm }, queryOpts)
      .then(result => {
        return res.json({ success: true, result });
      })
      .catch(err => {
        return res.json({ success: false, error: err });
      });
  }

};