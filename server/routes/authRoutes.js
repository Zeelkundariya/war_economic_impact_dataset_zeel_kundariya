const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  refreshToken,
  getMe,
  deleteAccount,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimitMiddleware');

router.options('/login', (req, res) => {
  res.setHeader('Allow', 'POST, OPTIONS');
  res.status(204).end();
});

router.post('/login', loginLimiter, authUser);
router.post('/register', registerLimiter, registerUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/refresh-token', refreshToken);
router.head('/me', protect, (req, res) => {
  res.setHeader('X-Session-Active', 'true');
  res.status(200).end();
});
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);
router.delete('/account', protect, deleteAccount);

module.exports = router;
