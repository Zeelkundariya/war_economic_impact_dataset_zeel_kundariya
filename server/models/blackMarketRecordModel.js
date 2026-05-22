const mongoose = require('mongoose');

const blackMarketRecordSchema = mongoose.Schema(
  {
    conflict: { type: String },
    country: { type: String, required: true },
    blackMarketActivityLevel: { type: String },
    mostTradedGoods: { type: String },
    currencyGapPercentage: { type: Number },
  },
  {
    timestamps: true,
  }
);

const BlackMarketRecord = mongoose.model('BlackMarketRecord', blackMarketRecordSchema);

module.exports = BlackMarketRecord;
