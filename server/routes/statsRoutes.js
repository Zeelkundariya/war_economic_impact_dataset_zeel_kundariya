const express = require('express');
const router = express.Router();
const {
  getTotalConflictsCount,
  getOngoingConflictsCount,
  getResolvedConflictsCount,
  getHighestInflationConflict,
  getLowestGDPConflict,
} = require('../controllers/conflictController');

// Fetch total conflicts count
router.get('/total-conflicts', getTotalConflictsCount);

// Fetch ongoing conflicts count
router.get('/ongoing-conflicts', getOngoingConflictsCount);

// Fetch resolved conflicts count
router.get('/resolved-conflicts', getResolvedConflictsCount);

// Fetch conflict with highest inflation
router.get('/highest-inflation', getHighestInflationConflict);

// Fetch conflict with lowest GDP
router.get('/lowest-gdp', getLowestGDPConflict);

module.exports = router;
