const mongoose = require('mongoose');

const economicRecordSchema = mongoose.Schema(
  {
    conflict: { type: String },
    country: { type: String, required: true },
    year: { type: Number },
    gdpChangePercentage: { type: Number },
    inflationRatePercentage: { type: Number },
    costOfWarUSD: { type: Number },
  },
  {
    timestamps: true,
  }
);

const EconomicRecord = mongoose.model('EconomicRecord', economicRecordSchema);

module.exports = EconomicRecord;
