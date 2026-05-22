const express = require('express');
const router = express.Router();
const { createBlackMarketRecord } = require('../controllers/recordController');

router.post('/', createBlackMarketRecord);

module.exports = router;
