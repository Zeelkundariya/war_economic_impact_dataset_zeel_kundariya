const express = require('express');
const router = express.Router();
const { createBlackMarketRecord, deleteBlackMarketRecord } = require('../controllers/recordController');

router.post('/', createBlackMarketRecord);
router.delete('/:recordId', deleteBlackMarketRecord);

module.exports = router;

