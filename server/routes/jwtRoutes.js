const express = require('express');
const router = express.Router();
const {
  getJwtProfile,
  getJwtDashboard,
  generateJwtToken,
  verifyJwtToken,
  refreshJwtToken,
} = require('../controllers/jwtController');
const { protect } = require('../middlewares/authMiddleware');

// GET /jwt/profile (Protected)
router.get('/profile', protect, getJwtProfile);

// GET /jwt/dashboard (Protected)
router.get('/dashboard', protect, getJwtDashboard);

// POST /jwt/generate-token (Public)
router.post('/generate-token', generateJwtToken);

// POST /jwt/verify-token (Public)
router.post('/verify-token', verifyJwtToken);

// POST /jwt/refresh-token (Public)
router.post('/refresh-token', refreshJwtToken);

module.exports = router;
