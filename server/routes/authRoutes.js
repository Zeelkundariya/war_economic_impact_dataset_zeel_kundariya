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
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimitMiddleware');

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
router.delete('/account', protect, deleteAccount);

module.exports = router;
