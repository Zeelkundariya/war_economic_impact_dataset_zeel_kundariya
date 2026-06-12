const Conflict = require('../models/conflictModel');
const User = require('../models/userModel');

// @desc    Get all conflicts for admin
// @route   GET /admin/conflicts
// @access  Private/Admin
const getAdminConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find({});
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a conflict
// @route   POST /admin/conflicts
// @access  Private/Admin
const adminCreateConflict = async (req, res) => {
  try {
    const conflict = await Conflict.create(req.body);
    res.status(201).json(conflict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a conflict
// @route   DELETE /admin/conflicts/:conflictId
// @access  Private/Admin
const adminDeleteConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findByIdAndDelete(req.params.conflictId);
    if (conflict) {
      res.json({ message: 'Conflict deleted by admin' });
    } else {
      res.status(404).json({ message: 'Conflict not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a conflict
// @route   PATCH /admin/conflicts/:conflictId
// @access  Private/Admin
const adminUpdateConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findByIdAndUpdate(req.params.conflictId, req.body, {
      new: true,
      runValidators: true,
    });
    if (conflict) {
      res.json(conflict);
    } else {
      res.status(404).json({ message: 'Conflict not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get admin dashboard stats
// @route   GET /admin/dashboard
// @access  Private/Admin
const getAdminDashboard = async (req, res) => {
  try {
    const totalConflicts = await Conflict.countDocuments({});
    const ongoingConflicts = await Conflict.countDocuments({ Status: 'Ongoing' });
    const resolvedConflicts = await Conflict.countDocuments({ Status: 'Resolved' });

    // Aggregate total costs where fields exist and are not null
    const totalWarCostResult = await Conflict.aggregate([
      { $match: { Cost_of_War_USD: { $ne: null } } },
      { $group: { _id: null, total: { $sum: '$Cost_of_War_USD' } } },
    ]);
    const totalReconstructionResult = await Conflict.aggregate([
      { $match: { Estimated_Reconstruction_Cost_USD: { $ne: null } } },
      { $group: { _id: null, total: { $sum: '$Estimated_Reconstruction_Cost_USD' } } },
    ]);

    const totalWarCost = totalWarCostResult[0] ? totalWarCostResult[0].total : 0;
    const totalReconstruction = totalReconstructionResult[0] ? totalReconstructionResult[0].total : 0;

    res.json({
      message: 'Welcome to the Admin Dashboard',
      stats: {
        totalConflicts,
        ongoingConflicts,
        resolvedConflicts,
        totalWarCostUSD: totalWarCost,
        totalReconstructionCostUSD: totalReconstruction,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users for admin
// @route   GET /admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role by admin
// @route   PUT /admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'You cannot change your own admin status' });
      }

      user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a user by admin
// @route   DELETE /admin/users/:id
// @access  Private/Admin
const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'You cannot delete yourself' });
      }

      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminConflicts,
  adminCreateConflict,
  adminDeleteConflict,
  adminUpdateConflict,
  getAdminDashboard,
  getAllUsers,
  updateUserRole,
  deleteUserByAdmin,
};
