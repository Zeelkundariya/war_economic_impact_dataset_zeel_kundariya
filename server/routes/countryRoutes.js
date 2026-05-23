const express = require('express');
const router = express.Router();
const { createCountry, updateCountry } = require('../controllers/recordController');

router.post('/', createCountry);
router.put('/:countryId', updateCountry);

module.exports = router;

