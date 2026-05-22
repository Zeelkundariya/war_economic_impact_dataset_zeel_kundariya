const mongoose = require('mongoose');

const unemploymentRecordSchema = mongoose.Schema(
  {
    conflict: { type: String },
    country: { type: String, required: true },
    unemploymentPercentage: { type: Number },
    youthUnemploymentChangePercentage: { type: Number },
  },
  {
    timestamps: true,
  }
);

const UnemploymentRecord = mongoose.model('UnemploymentRecord', unemploymentRecordSchema);

module.exports = UnemploymentRecord;
