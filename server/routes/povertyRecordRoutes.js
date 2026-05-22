const express = require('express');
const router = express.Router();
const { createPovertyRecord } = require('../controllers/recordController');

router.post('/', createPovertyRecord);

module.exports = router;
