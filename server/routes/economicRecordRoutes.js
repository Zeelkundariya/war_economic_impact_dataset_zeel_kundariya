const express = require('express');
const router = express.Router();
const { createEconomicRecord } = require('../controllers/recordController');

router.post('/', createEconomicRecord);

module.exports = router;
