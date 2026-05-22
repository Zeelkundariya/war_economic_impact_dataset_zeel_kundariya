const mongoose = require('mongoose');

const countrySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    region: { type: String },
    population: { type: Number },
    gdp: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
