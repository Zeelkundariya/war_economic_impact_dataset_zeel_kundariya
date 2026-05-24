const express = require('express');
const router = express.Router();
const {
  getProtectedConflicts,
  createProtectedConflict,
  deleteProtectedConflict,
} = require('../controllers/protectedController');
const { protect } = require('../middlewares/authMiddleware');

// Apply protection middleware to all routes in this router
router.use(protect);

// GET /protected/conflicts & POST /protected/conflicts
router.route('/conflicts')
  .get(getProtectedConflicts)
  .post(createProtectedConflict);

// DELETE /protected/conflicts/:conflictId
router.delete('/conflicts/:conflictId', deleteProtectedConflict);

module.exports = router;
