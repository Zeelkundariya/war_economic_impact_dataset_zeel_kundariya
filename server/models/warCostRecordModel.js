const mongoose = require('mongoose');

const warCostRecordSchema = mongoose.Schema(
  {
    conflict: { type: String },
    country: { type: String, required: true },
    costOfWarUSD: { type: Number },
  },
  {
    timestamps: true,
  }
);

const WarCostRecord = mongoose.model('WarCostRecord', warCostRecordSchema);

module.exports = WarCostRecord;
