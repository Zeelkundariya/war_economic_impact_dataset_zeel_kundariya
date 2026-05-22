const Region = require('../models/regionModel');
const Country = require('../models/countryModel');
const EconomicRecord = require('../models/economicRecordModel');
const PovertyRecord = require('../models/povertyRecordModel');

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

module.exports = {
  createRegion,
  createCountry,
  createEconomicRecord,
  createPovertyRecord,
};
