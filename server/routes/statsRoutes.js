const express = require('express');
const router = express.Router();
const Conflict = require('../models/conflictModel');
const {
  getTotalConflictsCount,
  getOngoingConflictsCount,
  getResolvedConflictsCount,
  getHighestInflationConflict,
  getLowestGDPConflict,
  getHighestPovertyConflict,
  getHighestFoodInsecurityConflict,
  getHighestCurrencyGapConflict,
  getHighestWarCostConflict,
  getHighestReconstructionCostConflict,
} = require('../controllers/conflictController');

// Fetch metadata for total conflicts stats
router.head('/total-conflicts', async (req, res) => {
  try {
    const count = await Conflict.countDocuments();
    res.setHeader('X-Total-Conflicts', count);
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

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

// Fetch conflict with highest poverty
router.get('/highest-poverty', getHighestPovertyConflict);

// Fetch conflict with highest food insecurity
router.get('/highest-food-insecurity', getHighestFoodInsecurityConflict);

// Fetch conflict with highest currency gap
router.get('/highest-currency-gap', getHighestCurrencyGapConflict);

// Fetch conflict with highest war cost
router.get('/highest-war-cost', getHighestWarCostConflict);

// Fetch conflict with highest reconstruction cost
router.get('/highest-reconstruction-cost', getHighestReconstructionCostConflict);

module.exports = router;

