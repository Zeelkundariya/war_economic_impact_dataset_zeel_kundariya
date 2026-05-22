const express = require('express');
const router = express.Router();
const { createUnemploymentRecord } = require('../controllers/recordController');

router.post('/', createUnemploymentRecord);

module.exports = router;
