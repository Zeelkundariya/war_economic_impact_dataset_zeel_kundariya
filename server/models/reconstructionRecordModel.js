const mongoose = require('mongoose');

const reconstructionRecordSchema = mongoose.Schema(
  {
    conflict: { type: String },
    country: { type: String, required: true },
    estimatedReconstructionCostUSD: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ReconstructionRecord = mongoose.model('ReconstructionRecord', reconstructionRecordSchema);

module.exports = ReconstructionRecord;
