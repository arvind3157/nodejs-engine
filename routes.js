const express = require('express');
const router = express.Router();

const search_controller = require('./controller/search-controller');

// POST request to search books
router.post('/search', search_controller.search);

module.exports = router;