const express = require('express');
const router = express.Router();
const { createWarCostRecord } = require('../controllers/recordController');

router.post('/', createWarCostRecord);

module.exports = router;
