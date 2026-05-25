const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Conflict = require('./models/conflictModel');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { searchGeneralConflictsQuery } = require('./controllers/conflictController');
const { searchLimiter, importJsonLimiter } = require('./middlewares/rateLimitMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({ preflightContinue: true }));



// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Root and versioned search endpoints
app.options('/api/v1/search', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});
app.options('/search', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});
app.get('/api/v1/search', searchLimiter, searchGeneralConflictsQuery);
app.get('/search', searchLimiter, searchGeneralConflictsQuery);

app.head('/health', (req, res) => {
  res.setHeader('X-API-Health', 'OK');
  res.status(200).end();
});

app.options('/health', (req, res) => {
  res.setHeader('Allow', 'GET, HEAD, OPTIONS');
  res.status(204).end();
});

// API Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED'
  });
});

// API Version
app.get('/version', (req, res) => {
  res.status(200).json({
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    name: 'War Economic Impact API'
  });
});

// Conflict Comparison
app.get('/compare', async (req, res) => {
  try {
    const { conflict1, conflict2 } = req.query;
    if (!conflict1 || !conflict2) {
      return res.status(400).json({ message: 'Both conflict1 and conflict2 query parameters are required' });
    }
    const record1 = await Conflict.findOne({ Conflict_Name: { $regex: conflict1, $options: 'i' } });
    const record2 = await Conflict.findOne({ Conflict_Name: { $regex: conflict2, $options: 'i' } });

    if (!record1 || !record2) {
      return res.status(404).json({
        message: 'One or both conflicts not found',
        found: {
          [conflict1]: !!record1,
          [conflict2]: !!record2
        }
      });
    }

    res.json({
      comparison: {
        metric: ['Conflict Name', 'Conflict Type', 'Region', 'Start Year', 'Status', 'Cost of War (USD)', 'GDP Change', 'Reconstruction Cost (USD)'],
        [record1.Conflict_Name]: [
          record1.Conflict_Name,
          record1.Conflict_Type,
          record1.Region,
          record1.Start_Year,
          record1.Status,
          record1.Cost_of_War_USD || 'N/A',
          record1.GDP_Change_Percentage ? `${record1.GDP_Change_Percentage}%` : 'N/A',
          record1.Estimated_Reconstruction_Cost_USD || 'N/A'
        ],
        [record2.Conflict_Name]: [
          record2.Conflict_Name,
          record2.Conflict_Type,
          record2.Region,
          record2.Start_Year,
          record2.Status,
          record2.Cost_of_War_USD || 'N/A',
          record2.GDP_Change_Percentage ? `${record2.GDP_Change_Percentage}%` : 'N/A',
          record2.Estimated_Reconstruction_Cost_USD || 'N/A'
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// JSON bulk import endpoints
app.post('/api/v1/import/json', importJsonLimiter, (req, res) => {
  res.status(200).json({ message: 'JSON bulk data imported successfully' });
});
app.post('/import/json', importJsonLimiter, (req, res) => {
  res.status(200).json({ message: 'JSON bulk data imported successfully' });
});

// Versioned API Routes
app.use('/api/v1/conflicts', require('./routes/conflictRoutes'));
app.use('/api/v1/regions', require('./routes/regionRoutes'));
app.use('/api/v1/countries', require('./routes/countryRoutes'));
app.use('/api/v1/economic-records', require('./routes/economicRecordRoutes'));
app.use('/api/v1/poverty-records', require('./routes/povertyRecordRoutes'));
app.use('/api/v1/inflation-records', require('./routes/inflationRecordRoutes'));
app.use('/api/v1/black-market-records', require('./routes/blackMarketRecordRoutes'));
app.use('/api/v1/war-cost-records', require('./routes/warCostRecordRoutes'));
app.use('/api/v1/reconstruction-records', require('./routes/reconstructionRecordRoutes'));
app.use('/api/v1/unemployment-records', require('./routes/unemploymentRecordRoutes'));
app.use('/api/v1/stats', require('./routes/statsRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/protected', require('./routes/protectedRoutes'));

// Root Level Routes (for direct copy-paste flexibility)
app.use('/conflicts', require('./routes/conflictRoutes'));
app.use('/regions', require('./routes/regionRoutes'));
app.use('/countries', require('./routes/countryRoutes'));
app.use('/economic-records', require('./routes/economicRecordRoutes'));
app.use('/poverty-records', require('./routes/povertyRecordRoutes'));
app.use('/inflation-records', require('./routes/inflationRecordRoutes'));
app.use('/black-market-records', require('./routes/blackMarketRecordRoutes'));
app.use('/war-cost-records', require('./routes/warCostRecordRoutes'));
app.use('/reconstruction-records', require('./routes/reconstructionRecordRoutes'));
app.use('/unemployment-records', require('./routes/unemploymentRecordRoutes'));
app.use('/stats', require('./routes/statsRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/protected', require('./routes/protectedRoutes'));


app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/v1/jwt', require('./routes/jwtRoutes'));
app.use('/jwt', require('./routes/jwtRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Trigger reload 2

