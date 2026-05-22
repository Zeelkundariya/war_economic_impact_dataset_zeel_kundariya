const mongoose = require('mongoose');

const regionSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;
