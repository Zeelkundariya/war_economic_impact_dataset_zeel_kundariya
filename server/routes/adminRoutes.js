const express = require('express');
const router = express.Router();
const {
  getAdminConflicts,
  adminCreateConflict,
  adminDeleteConflict,
  adminUpdateConflict,
  getAdminDashboard,
} = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

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
router.get('/dashboard', getAdminDashboard);

module.exports = router;
