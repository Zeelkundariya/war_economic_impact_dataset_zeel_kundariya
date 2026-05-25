const express = require('express');
const router = express.Router();
const {
  getJwtProfile,
  getJwtDashboard,
  generateJwtToken,
  verifyJwtToken,
  refreshJwtToken,
  getJwtAdmin,
  getJwtUser,
  deleteJwtLogout,
} = require('../controllers/jwtController');
const { protect, admin } = require('../middlewares/authMiddleware');

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

// GET /jwt/admin (Admin Protected)
router.get('/admin', protect, admin, getJwtAdmin);

// GET /jwt/user (User Protected)
router.get('/user', protect, getJwtUser);

// DELETE /jwt/logout (Public Session Logout)
router.delete('/logout', deleteJwtLogout);

module.exports = router;
