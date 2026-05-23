const express = require('express');
const router = express.Router();
const { createWarCostRecord, deleteWarCostRecord } = require('../controllers/recordController');

router.post('/', createWarCostRecord);
router.delete('/:recordId', deleteWarCostRecord);

module.exports = router;

