const express = require('express');
const router = express.Router();
const { createRegion } = require('../controllers/recordController');

router.post('/', createRegion);

module.exports = router;
