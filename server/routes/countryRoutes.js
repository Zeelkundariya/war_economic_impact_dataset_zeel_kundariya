const express = require('express');
const router = express.Router();
const { createCountry, updateCountry, deleteCountry } = require('../controllers/recordController');

router.post('/', createCountry);
router.put('/:countryId', updateCountry);
router.delete('/:countryId', deleteCountry);

module.exports = router;


