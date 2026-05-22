const express = require('express');
const router = express.Router();
const { createCountry } = require('../controllers/recordController');

router.post('/', createCountry);

module.exports = router;
