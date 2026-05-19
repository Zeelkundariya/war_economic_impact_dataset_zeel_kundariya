const express = require('express');
const router = express.Router();
const {
  getConflicts,
  getConflictById,
  createConflict,
  updateConflict,
  deleteConflict,
  getConflictsByName,
  getConflictsByType,
  getConflictsByRegion,
  getConflictsByStatus,
  getConflictsByCountry,
  getConflictsByStartYear,
  getConflictsByEndYear,
  getConflictsByInflation,
  getConflictsByGDPLoss,
  getConflictsByPoverty,
  getConflictsByExtremePoverty,
  getConflictsByFoodInsecurity,
  getConflictsByUnemployment,
  getConflictsByYouthUnemployment,
  getConflictsBySector,
  getConflictsByBlackMarketLevel,
  getConflictsByBlackMarketGoods,
  getConflictsByProfiteering,
  getConflictsByCurrencyGap,
  getConflictsByReconstructionCost,
  getConflictsByWarCost,
  getConflictsByInformalEconomyPre,
  getConflictsByInformalEconomyDuring,
  getConflictsByHouseholds,
  getLatestRegionalConflict,
  getOldestRegionalConflict,
  getCountryConflictHistory,
  getConflictCountByType,
  getConflictCountByStatus,
  getConflictsByYear,
  getSectorHighestGDPLoss,
  getSectorHighestInflation,
  getWarSummary,
  getWarEconomicImpact,
  getWarPovertyImpact,
  getWarBlackMarketImpact,
  getWarReconstructionDetails,
  getWarCurrencyCrisis,
  getWarUnemploymentImpact,
  filterConflictsByStatus,
  filterConflictsByRegion,
  filterConflictsByCountry,
  filterConflictsByType,
  filterConflictsByHighInflation,
  filterConflictsByLowInflation,
  filterConflictsByHighGDPLoss,
  filterConflictsByHighPoverty,
  filterConflictsByHighFoodInsecurity,
  filterConflictsByHighCurrencyGap,
  filterConflictsByHighWarCost,
  filterConflictsByHighReconstructionCost,
  filterConflictsBySectorQuery,
  filterConflictsByBlackMarketQuery,
  filterConflictsByProfiteeringQuery,
  filterConflictsByYearQuery,
  filterConflictsByStartYearQuery,
  filterConflictsByEndYearQuery,
  filterConflictsByCountryAndStatusQuery,
  filterConflictsByRegionAndTypeQuery,
  filterConflictsByInflationRangeQuery,
  filterConflictsByGDPRangeQuery,
  filterConflictsByPovertyRangeQuery,
  filterConflictsByUnemploymentRangeQuery,
  sortConflictsByInflationQuery,
  sortConflictsByGDPLossQuery,
  sortConflictsByStartYearQuery,
  sortConflictsByReconstructionCostQuery,
  searchConflictsByKeywordQuery,
} = require('../controllers/conflictController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Filter ongoing conflicts
router.get('/', (req, res, next) => {
  if (req.query.status) {
    return filterConflictsByStatus(req, res);
  }
  next();
});

// Filter conflicts by region
router.get('/', (req, res, next) => {
  if (req.query.region) {
    return filterConflictsByRegion(req, res);
  }
  next();
});

// Filter conflicts by country
router.get('/', (req, res, next) => {
  if (req.query.country) {
    return filterConflictsByCountry(req, res);
  }
  next();
});

// Filter conflicts by type
router.get('/', (req, res, next) => {
  if (req.query.type) {
    return filterConflictsByType(req, res);
  }
  next();
});

// Fetch high inflation conflicts
router.get('/', (req, res, next) => {
  if (req.query.inflationAbove) {
    return filterConflictsByHighInflation(req, res);
  }
  next();
});

// Fetch low inflation conflicts
router.get('/', (req, res, next) => {
  if (req.query.inflationBelow) {
    return filterConflictsByLowInflation(req, res);
  }
  next();
});

// Fetch conflicts with high GDP loss
router.get('/', (req, res, next) => {
  if (req.query.gdpLossAbove) {
    return filterConflictsByHighGDPLoss(req, res);
  }
  next();
});

// Fetch conflicts with high poverty
router.get('/', (req, res, next) => {
  if (req.query.povertyAbove) {
    return filterConflictsByHighPoverty(req, res);
  }
  next();
});

// Fetch high food insecurity conflicts
router.get('/', (req, res, next) => {
  if (req.query.foodInsecurityAbove) {
    return filterConflictsByHighFoodInsecurity(req, res);
  }
  next();
});

// Fetch high currency gap conflicts
router.get('/', (req, res, next) => {
  if (req.query.currencyGapAbove) {
    return filterConflictsByHighCurrencyGap(req, res);
  }
  next();
});

// Fetch expensive wars
router.get('/', (req, res, next) => {
  if (req.query.warCostAbove) {
    return filterConflictsByHighWarCost(req, res);
  }
  next();
});

// Fetch costly reconstruction conflicts
router.get('/', (req, res, next) => {
  if (req.query.reconstructionAbove) {
    return filterConflictsByHighReconstructionCost(req, res);
  }
  next();
});

// Filter conflicts by sector
router.get('/', (req, res, next) => {
  if (req.query.sector) {
    return filterConflictsBySectorQuery(req, res);
  }
  next();
});

// Fetch high black market conflicts
router.get('/', (req, res, next) => {
  if (req.query.blackMarket) {
    return filterConflictsByBlackMarketQuery(req, res);
  }
  next();
});

// Fetch profiteering conflicts
router.get('/', (req, res, next) => {
  if (req.query.profiteering) {
    return filterConflictsByProfiteeringQuery(req, res);
  }
  next();
});

// Fetch conflicts by year
router.get('/', (req, res, next) => {
  if (req.query.year) {
    return filterConflictsByYearQuery(req, res);
  }
  next();
});

// Fetch conflicts by start year
router.get('/', (req, res, next) => {
  if (req.query.startYear) {
    return filterConflictsByStartYearQuery(req, res);
  }
  next();
});

// Fetch conflicts by end year
router.get('/', (req, res, next) => {
  if (req.query.endYear) {
    return filterConflictsByEndYearQuery(req, res);
  }
  next();
});

// Fetch ongoing Ukraine conflicts
router.get('/', (req, res, next) => {
  if (req.query.country && req.query.status) {
    return filterConflictsByCountryAndStatusQuery(req, res);
  }
  next();
});

// Fetch Middle East civil wars
router.get('/', (req, res, next) => {
  if (req.query.region && req.query.type) {
    return filterConflictsByRegionAndTypeQuery(req, res);
  }
  next();
});

// Fetch conflicts within inflation range
router.get('/', (req, res, next) => {
  if (req.query.minInflation && req.query.maxInflation) {
    return filterConflictsByInflationRangeQuery(req, res);
  }
  next();
});

// Fetch conflicts within GDP loss range
router.get('/', (req, res, next) => {
  if (req.query.minGDP && req.query.maxGDP) {
    return filterConflictsByGDPRangeQuery(req, res);
  }
  next();
});

// Fetch conflicts within poverty range
router.get('/', (req, res, next) => {
  if (req.query.minPoverty && req.query.maxPoverty) {
    return filterConflictsByPovertyRangeQuery(req, res);
  }
  next();
});

// Fetch conflicts within unemployment range
router.get('/', (req, res, next) => {
  if (req.query.minUnemployment && req.query.maxUnemployment) {
    return filterConflictsByUnemploymentRangeQuery(req, res);
  }
  next();
});

// Sort conflicts by inflation
router.get('/', (req, res, next) => {
  if (req.query.sort === 'Inflation_Rate_%') {
    return sortConflictsByInflationQuery(req, res);
  }
  next();
});

// Sort conflicts descending by GDP change
router.get('/', (req, res, next) => {
  if (req.query.sort === '-GDP_Change_%') {
    return sortConflictsByGDPLossQuery(req, res);
  }
  next();
});

// Sort conflicts by start year
router.get('/', (req, res, next) => {
  if (req.query.sort === 'Start_Year') {
    return sortConflictsByStartYearQuery(req, res);
  }
  next();
});

// Sort by reconstruction cost
router.get('/', (req, res, next) => {
  if (req.query.sort === '-Estimated_Reconstruction_Cost_USD') {
    return sortConflictsByReconstructionCostQuery(req, res);
  }
  next();
});

// Search conflicts by keyword
router.get('/', (req, res, next) => {
  if (req.query.keyword) {
    return searchConflictsByKeywordQuery(req, res);
  }
  next();
});

// Fetch all conflicts
router.get('/', getConflicts);

// Create new conflict
router.post('/', protect, createConflict);

// Fetch conflict by ID
router.get('/:conflictId', getConflictById);

// Replace conflict data
router.put('/:conflictId', protect, updateConflict);

// Update conflict details
router.patch('/:conflictId', protect, updateConflict);

// Delete conflict
router.delete('/:conflictId', protect, deleteConflict);

// Fetch conflicts by name
router.get('/name/:name', getConflictsByName);

// Fetch conflicts by type
router.get('/type/:type', getConflictsByType);

// Fetch conflicts by region
router.get('/region/:region', getConflictsByRegion);

// Fetch conflicts by status
router.get('/status/:status', getConflictsByStatus);

// Fetch conflicts by country
router.get('/country/:country', getConflictsByCountry);

// Fetch conflicts by start year
router.get('/start-year/:year', getConflictsByStartYear);

// Fetch conflicts by end year
router.get('/end-year/:year', getConflictsByEndYear);

// Fetch conflicts by inflation rate
router.get('/inflation/:rate', getConflictsByInflation);

// Fetch conflicts by GDP loss
router.get('/gdp-loss/:percentage', getConflictsByGDPLoss);

// Fetch conflicts by poverty rate
router.get('/poverty/:rate', getConflictsByPoverty);

// Fetch conflicts by extreme poverty
router.get('/extreme-poverty/:rate', getConflictsByExtremePoverty);

// Fetch conflicts by food insecurity
router.get('/food-insecurity/:rate', getConflictsByFoodInsecurity);

// Fetch conflicts by unemployment
router.get('/unemployment/:rate', getConflictsByUnemployment);

// Fetch conflicts by youth unemployment
router.get('/youth-unemployment/:rate', getConflictsByYouthUnemployment);

// Fetch conflicts by sector
router.get('/sector/:sector', getConflictsBySector);

// Fetch conflicts by black market level
router.get('/black-market/:level', getConflictsByBlackMarketLevel);

// Fetch conflicts by black market goods
router.get('/black-market-goods/:goods', getConflictsByBlackMarketGoods);

// Fetch conflicts by profiteering status
router.get('/profiteering/:status', getConflictsByProfiteering);

// Fetch conflicts by currency gap
router.get('/currency-gap/:gap', getConflictsByCurrencyGap);

// Fetch conflicts by reconstruction cost
router.get('/reconstruction-cost/:amount', getConflictsByReconstructionCost);

// Fetch conflicts by war cost
router.get('/cost-of-war/:amount', getConflictsByWarCost);

// Fetch pre-war informal economy
router.get('/informal-economy/pre/:value', getConflictsByInformalEconomyPre);

// Fetch wartime informal economy
router.get('/informal-economy/during/:value', getConflictsByInformalEconomyDuring);

// Fetch conflicts by affected households
router.get('/households/:count', getConflictsByHouseholds);

// Fetch latest regional conflict
router.get('/region/:region/latest', getLatestRegionalConflict);

// Fetch oldest regional conflict
router.get('/region/:region/oldest', getOldestRegionalConflict);

// Fetch country conflict history
router.get('/country/:country/history', getCountryConflictHistory);

// Fetch conflict count by type
router.get('/type/:type/count', getConflictCountByType);

// Fetch conflict count by status
router.get('/status/:status/count', getConflictCountByStatus);

// Fetch conflicts by year
router.get('/year/:year', getConflictsByYear);

// Fetch sector highest GDP loss
router.get('/sector/:sector/highest-gdp-loss', getSectorHighestGDPLoss);

// Fetch sector highest inflation
router.get('/sector/:sector/highest-inflation', getSectorHighestInflation);

// Fetch war summary
router.get('/war/:name/summary', getWarSummary);

// Fetch economic impact
router.get('/war/:name/economic-impact', getWarEconomicImpact);

// Fetch poverty impact
router.get('/war/:name/poverty-impact', getWarPovertyImpact);

// Fetch black market impact
router.get('/war/:name/black-market', getWarBlackMarketImpact);

// Fetch reconstruction details
router.get('/war/:name/reconstruction', getWarReconstructionDetails);

// Fetch currency crisis data
router.get('/war/:name/currency-crisis', getWarCurrencyCrisis);

// Fetch unemployment impact
router.get('/war/:name/unemployment', getWarUnemploymentImpact);

module.exports = router;
