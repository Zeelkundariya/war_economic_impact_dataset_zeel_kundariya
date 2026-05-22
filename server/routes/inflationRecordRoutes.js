const express = require('express');
const router = Router = express.Router();
const { createInflationRecord } = require('../controllers/recordController');

router.post('/', createInflationRecord);

module.exports = router;
