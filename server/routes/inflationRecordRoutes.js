const express = require('express');
const router = express.Router();
const { createInflationRecord, deleteInflationRecord } = require('../controllers/recordController');

router.post('/', createInflationRecord);
router.delete('/:recordId', deleteInflationRecord);

module.exports = router;

