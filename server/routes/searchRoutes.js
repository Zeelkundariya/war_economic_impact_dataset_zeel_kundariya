const express = require('express');
const router = express.Router();
const {
  searchGeneralConflictsQuery,
  searchConflictsByCountryQuery,
  searchConflictsByRegionQuery,
  searchConflictsByTypeQuery,
  searchConflictsByStatusQuery,
  searchEconomicByInflationQuery,
  searchEconomicByPovertyQuery,
  searchEconomicByGDPLossQuery,
  searchEconomicByCurrencyQuery,
  searchSectorByNameQuery,
  searchBlackMarketByGoodsQuery
} = require('../controllers/conflictController');
const { searchLimiter } = require('../middlewares/rateLimitMiddleware');

// OPTIONS for all sub-routes under /search
router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});
router.options('/conflicts', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});
router.options('/economic', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});
router.options('/sector', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});
router.options('/black-market', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});

// Apply rate limiting to all search endpoints
router.use(searchLimiter);

// Search general conflicts by keyword
router.get('/', (req, res) => {
  return searchGeneralConflictsQuery(req, res);
});

// Search conflicts (by region, type, status, country)
router.get('/conflicts', (req, res, next) => {
  if (req.query.region) {
    return searchConflictsByRegionQuery(req, res);
  }
  next();
});

router.get('/conflicts', (req, res, next) => {
  if (req.query.type) {
    return searchConflictsByTypeQuery(req, res);
  }
  next();
});

router.get('/conflicts', (req, res, next) => {
  if (req.query.status) {
    return searchConflictsByStatusQuery(req, res);
  }
  next();
});

// Default to country if no other params matched (as in conflictRoutes.js)
router.get('/conflicts', searchConflictsByCountryQuery);

// Search economic (by inflation, poverty, gdp, currency)
router.get('/economic', (req, res, next) => {
  if (req.query.inflation) {
    return searchEconomicByInflationQuery(req, res);
  }
  next();
});

router.get('/economic', (req, res, next) => {
  if (req.query.poverty) {
    return searchEconomicByPovertyQuery(req, res);
  }
  next();
});

router.get('/economic', (req, res, next) => {
  if (req.query.gdp) {
    return searchEconomicByGDPLossQuery(req, res);
  }
  next();
});

router.get('/economic', (req, res, next) => {
  if (req.query.currency) {
    return searchEconomicByCurrencyQuery(req, res);
  }
  next();
});

// Search sector by name
router.get('/sector', (req, res, next) => {
  if (req.query.name) {
    return searchSectorByNameQuery(req, res);
  }
  next();
});

// Search black market by goods
router.get('/black-market', (req, res, next) => {
  if (req.query.goods) {
    return searchBlackMarketByGoodsQuery(req, res);
  }
  next();
});

module.exports = router;
