const express = require('express');
const router = express.Router();
const { createReconstructionRecord } = require('../controllers/recordController');

router.post('/', createReconstructionRecord);

module.exports = router;
