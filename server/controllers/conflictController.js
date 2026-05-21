const Conflict = require('../models/conflictModel');

const getConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find({});
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConflictById = async (req, res) => {
  try {
    const conflict = await Conflict.findById(req.params.conflictId);
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'Conflict not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createConflict = async (req, res) => {
  try {
    const conflict = await Conflict.create(req.body);
    res.status(201).json(conflict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findByIdAndUpdate(req.params.conflictId, req.body, {
      new: true,
      runValidators: true,
    });
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'Conflict not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findByIdAndDelete(req.params.conflictId);
    if (conflict) {
      res.json({ message: 'Conflict removed' });
    } else {
      res.status(404).json({ message: 'Conflict not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by name
const getConflictsByName = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by type
const getConflictsByType = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Conflict_Type: { $regex: req.params.type, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by region
const getConflictsByRegion = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Region: { $regex: req.params.region, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by status
const getConflictsByStatus = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Status: { $regex: req.params.status, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by country
const getConflictsByCountry = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Primary_Country: { $regex: req.params.country, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by start year
const getConflictsByStartYear = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Start_Year: { $regex: req.params.year, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by end year
const getConflictsByEndYear = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      End_Year: { $regex: req.params.year, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by inflation rate
const getConflictsByInflation = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Inflation_Rate_Percentage: parseFloat(req.params.rate),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by GDP loss
const getConflictsByGDPLoss = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      GDP_Change_Percentage: parseFloat(req.params.percentage),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by poverty rate
const getConflictsByPoverty = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      During_War_Poverty_Rate_Percentage: parseFloat(req.params.rate),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by extreme poverty
const getConflictsByExtremePoverty = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Extreme_Poverty_Rate_Percentage: parseFloat(req.params.rate),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by food insecurity
const getConflictsByFoodInsecurity = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Food_Insecurity_Rate_Percentage: parseFloat(req.params.rate),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by unemployment
const getConflictsByUnemployment = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      During_War_Unemployment_Percentage: parseFloat(req.params.rate),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by youth unemployment
const getConflictsByYouthUnemployment = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Youth_Unemployment_Change_Percentage: parseFloat(req.params.rate),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by sector
const getConflictsBySector = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Most_Affected_Sector: { $regex: req.params.sector, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by black market level
const getConflictsByBlackMarketLevel = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Black_Market_Activity_Level: { $regex: req.params.level, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by black market goods
const getConflictsByBlackMarketGoods = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Most_Traded_Black_Market_Goods: { $regex: req.params.goods, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by profiteering status
const getConflictsByProfiteering = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      War_Profiteering_Instances: { $regex: req.params.status, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by currency gap
const getConflictsByCurrencyGap = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Currency_Gap_Percentage: parseFloat(req.params.gap),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by reconstruction cost
const getConflictsByReconstructionCost = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Estimated_Reconstruction_Cost_USD: parseFloat(req.params.amount),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by war cost
const getConflictsByWarCost = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Cost_of_War_USD: parseFloat(req.params.amount),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch pre-war informal economy
const getConflictsByInformalEconomyPre = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Informal_Economy_Size_Pre_War_Percentage: parseFloat(req.params.value),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch wartime informal economy
const getConflictsByInformalEconomyDuring = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Informal_Economy_Size_During_War_Percentage: parseFloat(req.params.value),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by affected households
const getConflictsByHouseholds = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Households_Fallen_Into_Poverty_Estimate: parseFloat(req.params.count),
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch latest regional conflict
const getLatestRegionalConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Region: { $regex: req.params.region, $options: 'i' },
    }).sort({ Start_Year: -1 });

    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'No conflicts found for this region' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch oldest regional conflict
const getOldestRegionalConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Region: { $regex: req.params.region, $options: 'i' },
    }).sort({ Start_Year: 1 });
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'No conflicts found for this region' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch country conflict history
const getCountryConflictHistory = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Primary_Country: { $regex: req.params.country, $options: 'i' },
    }).sort({ Start_Year: 1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflict count by type
const getConflictCountByType = async (req, res) => {
  try {
    const count = await Conflict.countDocuments({
      Conflict_Type: { $regex: req.params.type, $options: 'i' },
    });
    res.json({ type: req.params.type, count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflict count by status
const getConflictCountByStatus = async (req, res) => {
  try {
    const count = await Conflict.countDocuments({
      Status: { $regex: req.params.status, $options: 'i' },
    });
    res.json({ status: req.params.status, count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by year
const getConflictsByYear = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Start_Year: { $regex: req.params.year, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch sector highest GDP loss
const getSectorHighestGDPLoss = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Most_Affected_Sector: { $regex: req.params.sector, $options: 'i' },
    }).sort({ GDP_Change_Percentage: 1 });
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'No conflicts found for this sector' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch sector highest inflation
const getSectorHighestInflation = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Most_Affected_Sector: { $regex: req.params.sector, $options: 'i' },
    }).sort({ Inflation_Rate_Percentage: -1 });
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'No conflicts found for this sector' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch war summary
const getWarSummary = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    }).select('Conflict_Name Conflict_Type Region Start_Year End_Year Status Primary_Country');
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'War not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch economic impact
const getWarEconomicImpact = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    }).select('Conflict_Name GDP_Change_Percentage Inflation_Rate_Percentage Cost_of_War_USD Estimated_Reconstruction_Cost_USD Informal_Economy_Size_Pre_War_Percentage Informal_Economy_Size_During_War_Percentage');
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'War not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch poverty impact
const getWarPovertyImpact = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    }).select('Conflict_Name During_War_Poverty_Rate_Percentage Extreme_Poverty_Rate_Percentage Food_Insecurity_Rate_Percentage During_War_Unemployment_Percentage Households_Fallen_Into_Poverty_Estimate');
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'War not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch black market impact
const getWarBlackMarketImpact = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    }).select('Conflict_Name Black_Market_Activity_Level Most_Traded_Black_Market_Goods War_Profiteering_Instances');
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'War not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch reconstruction details
const getWarReconstructionDetails = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    }).select('Conflict_Name Estimated_Reconstruction_Cost_USD Cost_of_War_USD');
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'War not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch currency crisis data
const getWarCurrencyCrisis = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    }).select('Conflict_Name Currency_Gap_Percentage Inflation_Rate_Percentage');
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'War not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch unemployment impact
const getWarUnemploymentImpact = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      Conflict_Name: { $regex: req.params.name, $options: 'i' },
    }).select('Conflict_Name During_War_Unemployment_Percentage Youth_Unemployment_Change_Percentage');
    
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'War not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter ongoing conflicts
const filterConflictsByStatus = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Status: { $regex: req.query.status, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter conflicts by region
const filterConflictsByRegion = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Region: { $regex: req.query.region, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter conflicts by country
const filterConflictsByCountry = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Primary_Country: { $regex: req.query.country, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter conflicts by type
const filterConflictsByType = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Conflict_Type: { $regex: req.query.type, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch high inflation conflicts
const filterConflictsByHighInflation = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Inflation_Rate_Percentage: { $gt: parseFloat(req.query.inflationAbove) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch low inflation conflicts
const filterConflictsByLowInflation = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Inflation_Rate_Percentage: { $lt: parseFloat(req.query.inflationBelow) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts with high GDP loss
const filterConflictsByHighGDPLoss = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      GDP_Change_Percentage: { $lt: -parseFloat(req.query.gdpLossAbove) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts with high poverty
const filterConflictsByHighPoverty = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      During_War_Poverty_Rate_Percentage: { $gt: parseFloat(req.query.povertyAbove) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch high food insecurity conflicts
const filterConflictsByHighFoodInsecurity = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Food_Insecurity_Rate_Percentage: { $gt: parseFloat(req.query.foodInsecurityAbove) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch high currency gap conflicts
const filterConflictsByHighCurrencyGap = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Currency_Gap_Percentage: { $gt: parseFloat(req.query.currencyGapAbove) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch expensive wars
const filterConflictsByHighWarCost = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Cost_of_War_USD: { $gt: parseFloat(req.query.warCostAbove) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch costly reconstruction conflicts
const filterConflictsByHighReconstructionCost = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Estimated_Reconstruction_Cost_USD: { $gt: parseFloat(req.query.reconstructionAbove) },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter conflicts by sector
const filterConflictsBySectorQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Most_Affected_Sector: { $regex: req.query.sector, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch high black market conflicts
const filterConflictsByBlackMarketQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Black_Market_Activity_Level: { $regex: req.query.blackMarket, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch profiteering conflicts
const filterConflictsByProfiteeringQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      War_Profiteering_Instances: { $regex: req.query.profiteering, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by year
const filterConflictsByYearQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Start_Year: { $regex: req.query.year, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by start year
const filterConflictsByStartYearQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Start_Year: { $regex: req.query.startYear, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts by end year
const filterConflictsByEndYearQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      End_Year: { $regex: req.query.endYear, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch ongoing Ukraine conflicts
const filterConflictsByCountryAndStatusQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Primary_Country: { $regex: req.query.country, $options: 'i' },
      Status: { $regex: req.query.status, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Middle East civil wars
const filterConflictsByRegionAndTypeQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Region: { $regex: req.query.region, $options: 'i' },
      Conflict_Type: { $regex: req.query.type, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts within inflation range
const filterConflictsByInflationRangeQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Inflation_Rate_Percentage: {
        $gte: parseFloat(req.query.minInflation),
        $lte: parseFloat(req.query.maxInflation),
      },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts within GDP loss range
const filterConflictsByGDPRangeQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      GDP_Change_Percentage: {
        $gte: parseFloat(req.query.minGDP),
        $lte: parseFloat(req.query.maxGDP),
      },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts within poverty range
const filterConflictsByPovertyRangeQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      During_War_Poverty_Rate_Percentage: {
        $gte: parseFloat(req.query.minPoverty),
        $lte: parseFloat(req.query.maxPoverty),
      },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch conflicts within unemployment range
const filterConflictsByUnemploymentRangeQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      During_War_Unemployment_Percentage: {
        $gte: parseFloat(req.query.minUnemployment),
        $lte: parseFloat(req.query.maxUnemployment),
      },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sort conflicts by inflation
const sortConflictsByInflationQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({}).sort({ Inflation_Rate_Percentage: 1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sort conflicts descending by GDP change
const sortConflictsByGDPLossQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({}).sort({ GDP_Change_Percentage: -1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sort conflicts by start year
const sortConflictsByStartYearQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({}).sort({ Start_Year: 1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sort by reconstruction cost
const sortConflictsByReconstructionCostQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({}).sort({ Estimated_Reconstruction_Cost_USD: -1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search conflicts by keyword
const searchConflictsByKeywordQuery = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const conflicts = await Conflict.find({
      $or: [
        { Conflict_Name: { $regex: keyword, $options: 'i' } },
        { Primary_Country: { $regex: keyword, $options: 'i' } },
        { Region: { $regex: keyword, $options: 'i' } },
        { Conflict_Type: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate conflicts
const paginateConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({}).skip(skip).limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate ongoing conflicts
const paginateOngoingConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ Status: { $regex: 'Ongoing', $options: 'i' } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate resolved conflicts
const paginateResolvedConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ Status: { $regex: 'Resolved', $options: 'i' } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate Europe conflicts
const paginateEuropeConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ Region: { $regex: 'Europe', $options: 'i' } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Paginate Asia conflicts
const paginateAsiaConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ Region: { $regex: 'Asia', $options: 'i' } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate high inflation conflicts
const paginateHighInflationConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ Inflation_Rate_Percentage: { $gte: 50 } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate high poverty conflicts
const paginateHighPovertyConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ During_War_Poverty_Rate_Percentage: { $gte: 25 } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate high GDP loss conflicts
const paginateHighGDPLossConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ GDP_Change_Percentage: { $lt: -30 } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paginate high black market conflicts
const paginateHighBlackMarketConflictsQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({ Black_Market_Activity_Level: { $regex: 'High', $options: 'i' } })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search general conflicts by keyword
const searchGeneralConflictsQuery = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const conflicts = await Conflict.find({
      $or: [
        { Conflict_Name: { $regex: keyword, $options: 'i' } },
        { Primary_Country: { $regex: keyword, $options: 'i' } },
        { Region: { $regex: keyword, $options: 'i' } },
        { Conflict_Type: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search conflicts by country
const searchConflictsByCountryQuery = async (req, res) => {
  try {
    const country = req.query.country;
    const conflicts = await Conflict.find({
      Primary_Country: { $regex: country, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Africa conflicts (Search conflicts by region)
const searchConflictsByRegionQuery = async (req, res) => {
  try {
    const region = req.query.region;
    const conflicts = await Conflict.find({
      Region: { $regex: region, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search civil wars (Search conflicts by type)
const searchConflictsByTypeQuery = async (req, res) => {
  try {
    const type = req.query.type;
    const conflicts = await Conflict.find({
      Conflict_Type: { $regex: type, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search resolved conflicts (Search conflicts by status)
const searchConflictsByStatusQuery = async (req, res) => {
  try {
    const status = req.query.status;
    const conflicts = await Conflict.find({
      Status: { $regex: status, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search high inflation conflicts (Search economic by inflation)
const searchEconomicByInflationQuery = async (req, res) => {
  try {
    const inflation = parseFloat(req.query.inflation);
    const conflicts = await Conflict.find({
      Inflation_Rate_Percentage: { $gte: inflation },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search poverty impact (Search economic by poverty)
const searchEconomicByPovertyQuery = async (req, res) => {
  try {
    const poverty = parseFloat(req.query.poverty);
    const conflicts = await Conflict.find({
      During_War_Poverty_Rate_Percentage: { $gte: poverty },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search GDP loss (Search economic by GDP)
const searchEconomicByGDPLossQuery = async (req, res) => {
  try {
    const gdp = parseFloat(req.query.gdp);
    const conflicts = await Conflict.find({
      GDP_Change_Percentage: { $lte: gdp },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search currency crisis (Search economic by currency)
const searchEconomicByCurrencyQuery = async (req, res) => {
  try {
    const currency = parseFloat(req.query.currency);
    const conflicts = await Conflict.find({
      Currency_Gap_Percentage: { $gte: currency },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search sector by name (Search affected sector)
const searchSectorByNameQuery = async (req, res) => {
  try {
    const name = req.query.name;
    const conflicts = await Conflict.find({
      Most_Affected_Sector: { $regex: name, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search black market by goods (Search black market goods)
const searchBlackMarketByGoodsQuery = async (req, res) => {
  try {
    const goods = req.query.goods;
    const conflicts = await Conflict.find({
      Most_Traded_Black_Market_Goods: { $regex: goods, $options: 'i' },
    });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined: Ongoing conflicts sorted by inflation with pagination
const getCombinedOngoingInflationQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({
      Status: { $regex: 'Ongoing', $options: 'i' },
    })
      .sort({ Inflation_Rate_Percentage: -1 })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined: Europe conflicts with pagination
const getCombinedEuropePaginatedQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({
      Region: { $regex: 'Europe', $options: 'i' },
    })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined: Japan conflicts sorted by GDP loss
const getCombinedJapanGDPLossQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Primary_Country: { $regex: 'Japan', $options: 'i' },
    }).sort({ GDP_Change_Percentage: -1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined: World War conflicts with pagination
const getCombinedWorldWarPaginatedQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const conflicts = await Conflict.find({
      Conflict_Type: { $regex: 'World War', $options: 'i' },
    })
      .skip(skip)
      .limit(limit);
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined: High black market conflicts sorted by currency gap
const getCombinedBlackMarketCurrencyQuery = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      Black_Market_Activity_Level: { $regex: 'High', $options: 'i' },
    }).sort({ Currency_Gap_Percentage: -1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
  paginateConflictsQuery,
  paginateOngoingConflictsQuery,
  paginateResolvedConflictsQuery,
  paginateEuropeConflictsQuery,
  paginateAsiaConflictsQuery,
  paginateHighInflationConflictsQuery,
  paginateHighPovertyConflictsQuery,
  paginateHighGDPLossConflictsQuery,
  paginateHighBlackMarketConflictsQuery,
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
  searchBlackMarketByGoodsQuery,
  getCombinedOngoingInflationQuery,
  getCombinedEuropePaginatedQuery,
  getCombinedJapanGDPLossQuery,
  getCombinedWorldWarPaginatedQuery,
  getCombinedBlackMarketCurrencyQuery,
};
