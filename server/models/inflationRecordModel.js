const mongoose = require('mongoose');

const inflationRecordSchema = mongoose.Schema(
  {
    conflict: { type: String },
    country: { type: String, required: true },
    inflationRatePercentage: { type: Number },
    year: { type: Number },
  },
  {
    timestamps: true,
  }
);

const InflationRecord = mongoose.model('InflationRecord', inflationRecordSchema);

module.exports = InflationRecord;
