const express = require('express');
const router = express.Router();
const { createReconstructionRecord, updateReconstructionRecord } = require('../controllers/recordController');

router.post('/', createReconstructionRecord);
router.put('/:recordId', updateReconstructionRecord);

module.exports = router;

