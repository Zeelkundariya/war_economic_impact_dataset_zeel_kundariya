const jwt = require('jsonwebtoken');

// @desc    Access JWT protected profile
// @route   GET /jwt/profile
// @access  Private
const getJwtProfile = async (req, res) => {
  if (req.user) {
    res.json({
      message: 'Access granted to JWT protected profile',
      user: req.user,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Access JWT protected dashboard
// @route   GET /jwt/dashboard
// @access  Private
const getJwtDashboard = async (req, res) => {
  res.json({
    message: 'Access granted to JWT protected dashboard',
    systemStatus: 'All systems operational',
    timestamp: new Date(),
  });
};

// @desc    Generate JWT token manually
// @route   POST /jwt/generate-token
// @access  Public
const generateJwtToken = async (req, res) => {
  const { id, email } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'User ID (id) is required to generate a token' });
  }

  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.json({ token });
};

// @desc    Verify JWT token manually
// @route   POST /jwt/verify-token
// @access  Public
const verifyJwtToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};

// @desc    Refresh JWT token manually
// @route   POST /jwt/refresh-token
// @access  Public
const refreshJwtToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const getJwtAdmin = async (req, res) => {
  res.json({
    message: 'Access granted to JWT admin protected route',
    user: req.user,
  });
};

const getJwtUser = async (req, res) => {
  res.json({
    message: 'Access granted to JWT user protected route',
    user: req.user,
  });
};

const deleteJwtLogout = async (req, res) => {
  res.json({
    message: 'JWT session logged out successfully',
  });
};

module.exports = {
  getJwtProfile,
  getJwtDashboard,
  generateJwtToken,
  verifyJwtToken,
  refreshJwtToken,
  getJwtAdmin,
  getJwtUser,
  deleteJwtLogout,
};
