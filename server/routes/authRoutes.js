const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
