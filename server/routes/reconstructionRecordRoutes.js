const express = require('express');
const router = express.Router();
const { createReconstructionRecord, updateReconstructionRecord, deleteReconstructionRecord } = require('../controllers/recordController');

router.post('/', createReconstructionRecord);
router.put('/:recordId', updateReconstructionRecord);
router.delete('/:recordId', deleteReconstructionRecord);

module.exports = router;


