const express = require('express');
const router = express.Router();
const {
  getAdminConflicts,
  adminCreateConflict,
  adminDeleteConflict,
  adminUpdateConflict,
  getAdminDashboard,
  getAllUsers,
  updateUserRole,
  deleteUserByAdmin,
} = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');
const { adminDashboardLimiter } = require('../middlewares/rateLimitMiddleware');

router.options('/conflicts', (req, res) => {
  res.setHeader('Allow', 'GET, POST, OPTIONS');
  res.status(204).end();
});

// Apply protection and admin authorization middleware to all routes
router.use(protect);
router.use(admin);

// GET /admin/conflicts & POST /admin/conflicts
router.route('/conflicts')
  .get(getAdminConflicts)
  .post(adminCreateConflict);

// DELETE /admin/conflicts/:conflictId & PATCH /admin/conflicts/:conflictId
router.route('/conflicts/:conflictId')
  .delete(adminDeleteConflict)
  .patch(adminUpdateConflict);

// GET /admin/dashboard
router.get('/dashboard', adminDashboardLimiter, getAdminDashboard);

// User Management Routes
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUserByAdmin);

module.exports = router;
