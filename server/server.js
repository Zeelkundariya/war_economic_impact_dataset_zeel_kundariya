const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());



// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Trigger reload 2

