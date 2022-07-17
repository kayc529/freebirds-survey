const express = require('express');
const router = express.Router();

const { displayHomePage } = require('../controllers/indexController');

/* GET home page. */
router.get('/', displayHomePage);

module.exports = router;
