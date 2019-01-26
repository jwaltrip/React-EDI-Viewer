const express = require("express");
const router = express.Router();
const ediController = require("../controllers/EdiRoute.controller");

// returns all orders
router.get('/', ediController.index);

// returns paginated orders
router.get('/:page', ediController.page);

// search route with pagination
router.get('/search/:searchTerm', ediController.search);

module.exports = router;