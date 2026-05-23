const express = require('express');
const router = express.Router();
const { createRegion, deleteRegion } = require('../controllers/recordController');

router.post('/', createRegion);
router.delete('/:regionId', deleteRegion);

module.exports = router;

