const express = require('express');
const router = express.Router();
const { createPovertyRecord, deletePovertyRecord } = require('../controllers/recordController');

router.post('/', createPovertyRecord);
router.delete('/:recordId', deletePovertyRecord);

module.exports = router;

