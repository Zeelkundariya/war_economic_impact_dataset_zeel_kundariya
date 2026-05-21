const mongoose = require('mongoose');
const dotenv = require('dotenv');
const conflicts = require('./dataset.json');
const Conflict = require('./models/conflictModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Conflict.deleteMany();
    
    // Map the JSON keys to Schema keys if necessary
    const sampleData = conflicts.map(conflict => ({
      Conflict_Name: conflict.Conflict_Name,
      Conflict_Type: conflict.Conflict_Type,
      Region: conflict.Region,
      Start_Year: conflict.Start_Year,
      End_Year: conflict.End_Year,
      Status: conflict.Status,
      Primary_Country: conflict.Primary_Country,
      GDP_Change_Percentage: parseFloat(conflict["GDP_Change_%"]),
      Inflation_Rate_Percentage: parseFloat(conflict["Inflation_Rate_%"]),
      Cost_of_War_USD: parseFloat(conflict.Cost_of_War_USD),
      During_War_Poverty_Rate_Percentage: parseFloat(conflict["During_War_Poverty_Rate_%"]),
      Extreme_Poverty_Rate_Percentage: parseFloat(conflict["Extreme_Poverty_Rate_%"]),
      Food_Insecurity_Rate_Percentage: parseFloat(conflict["Food_Insecurity_Rate_%"]),
      During_War_Unemployment_Percentage: parseFloat(conflict["During_War_Unemployment_%"]),
      Youth_Unemployment_Change_Percentage: parseFloat(conflict["Youth_Unemployment_Change_%"]),
      Most_Affected_Sector: conflict.Most_Affected_Sector,
      Black_Market_Activity_Level: conflict.Black_Market_Activity_Level,
      Most_Traded_Black_Market_Goods: conflict.Primary_Black_Market_Goods || conflict.Most_Traded_Black_Market_Goods,
      War_Profiteering_Instances: conflict.War_Profiteering_Documented || conflict.War_Profiteering_Instances,
      Currency_Gap_Percentage: parseFloat(conflict["Currency_Black_Market_Rate_Gap_%"]) || parseFloat(conflict["Official_vs_Black_Market_Rate_Gap_%"]) || 0,
      Estimated_Reconstruction_Cost_USD: parseFloat(conflict.Estimated_Reconstruction_Cost_USD) || 0,
      Informal_Economy_Size_Pre_War_Percentage: parseFloat(conflict["Informal_Economy_Size_Pre_War_%"]) || 0,
      Informal_Economy_Size_During_War_Percentage: parseFloat(conflict["Informal_Economy_Size_During_War_%"]) || 0,
      Households_Fallen_Into_Poverty_Estimate: parseFloat(conflict.Households_Fallen_Into_Poverty_Estimate) || 0,
    }));

    await Conflict.insertMany(sampleData);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Conflict.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
