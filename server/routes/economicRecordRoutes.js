const express = require('express');
const router = express.Router();
const { createEconomicRecord, updateEconomicRecord } = require('../controllers/recordController');

router.post('/', createEconomicRecord);
router.put('/:recordId', updateEconomicRecord);

module.exports = router;

