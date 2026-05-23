const Region = require('../models/regionModel');
const Country = require('../models/countryModel');
const EconomicRecord = require('../models/economicRecordModel');
const PovertyRecord = require('../models/povertyRecordModel');
const InflationRecord = require('../models/inflationRecordModel');
const BlackMarketRecord = require('../models/blackMarketRecordModel');
const WarCostRecord = require('../models/warCostRecordModel');
const ReconstructionRecord = require('../models/reconstructionRecordModel');
const UnemploymentRecord = require('../models/unemploymentRecordModel');

// Create Region
const createRegion = async (req, res) => {
  try {
    const region = await Region.create(req.body);
    res.status(201).json(region);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Country
const createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Economic Record
const createEconomicRecord = async (req, res) => {
  try {
    const record = await EconomicRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Poverty Record
const createPovertyRecord = async (req, res) => {
  try {
    const record = await PovertyRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Inflation Record
const createInflationRecord = async (req, res) => {
  try {
    const record = await InflationRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Black Market Record
const createBlackMarketRecord = async (req, res) => {
  try {
    const record = await BlackMarketRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create War Cost Record
const createWarCostRecord = async (req, res) => {
  try {
    const record = await WarCostRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Reconstruction Record
const createReconstructionRecord = async (req, res) => {
  try {
    const record = await ReconstructionRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Unemployment Record
const createUnemploymentRecord = async (req, res) => {
  try {
    const record = await UnemploymentRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Country
const updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.countryId, req.body, {
      new: true,
      runValidators: true,
    });
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Economic Record
const updateEconomicRecord = async (req, res) => {
  try {
    const record = await EconomicRecord.findByIdAndUpdate(req.params.recordId, req.body, {
      new: true,
      runValidators: true,
    });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Economic record not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Reconstruction Record
const updateReconstructionRecord = async (req, res) => {
  try {
    const record = await ReconstructionRecord.findByIdAndUpdate(req.params.recordId, req.body, {
      new: true,
      runValidators: true,
    });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Reconstruction record not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Region
const deleteRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndDelete(req.params.regionId);
    if (region) {
      res.json({ message: 'Region removed' });
    } else {
      res.status(404).json({ message: 'Region not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Country
const deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.countryId);
    if (country) {
      res.json({ message: 'Country removed' });
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Economic Record
const deleteEconomicRecord = async (req, res) => {
  try {
    const record = await EconomicRecord.findByIdAndDelete(req.params.recordId);
    if (record) {
      res.json({ message: 'Economic record removed' });
    } else {
      res.status(404).json({ message: 'Economic record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Poverty Record
const deletePovertyRecord = async (req, res) => {
  try {
    const record = await PovertyRecord.findByIdAndDelete(req.params.recordId);
    if (record) {
      res.json({ message: 'Poverty record removed' });
    } else {
      res.status(404).json({ message: 'Poverty record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRegion,
  deleteRegion,
  createCountry,
  updateCountry,
  deleteCountry,
  createEconomicRecord,
  updateEconomicRecord,
  deleteEconomicRecord,
  createPovertyRecord,
  deletePovertyRecord,
  createInflationRecord,
  createBlackMarketRecord,
  createWarCostRecord,
  createReconstructionRecord,
  updateReconstructionRecord,
  createUnemploymentRecord,
};


