const mongoose = require('mongoose');

const povertyRecordSchema = mongoose.Schema(
  {
    conflict: { type: String },
    country: { type: String, required: true },
    povertyRatePercentage: { type: Number },
    extremePovertyRatePercentage: { type: Number },
    foodInsecurityRatePercentage: { type: Number },
  },
  {
    timestamps: true,
  }
);

const PovertyRecord = mongoose.model('PovertyRecord', povertyRecordSchema);

module.exports = PovertyRecord;
