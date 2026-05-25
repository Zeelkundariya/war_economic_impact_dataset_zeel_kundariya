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

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/refresh-token', refreshToken);
router.get('/me', protect, getMe);
router.delete('/account', protect, deleteAccount);

module.exports = router;
