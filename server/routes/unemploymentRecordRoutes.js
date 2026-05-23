const express = require('express');
const router = express.Router();
const { createUnemploymentRecord, deleteUnemploymentRecord } = require('../controllers/recordController');

router.post('/', createUnemploymentRecord);
router.delete('/:recordId', deleteUnemploymentRecord);

module.exports = router;

