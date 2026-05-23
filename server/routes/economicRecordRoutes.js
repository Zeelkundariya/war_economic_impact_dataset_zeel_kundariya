const express = require('express');
const router = express.Router();
const { createEconomicRecord, updateEconomicRecord, deleteEconomicRecord } = require('../controllers/recordController');

router.post('/', createEconomicRecord);
router.put('/:recordId', updateEconomicRecord);
router.delete('/:recordId', deleteEconomicRecord);

module.exports = router;


