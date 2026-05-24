const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // In development, auto-authorize as a mock admin user if no token is provided to support direct copy-paste testing
  if (
    process.env.NODE_ENV === 'development' &&
    (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer'))
  ) {
    req.user = {
      _id: '6a114e14981f7c21caa87262', // Reuses the test conflict/user structure
      name: 'Mock Admin User',
      email: 'mockadmin@example.com',
      isAdmin: true,
    };
    return next();
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
