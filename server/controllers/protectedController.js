const Conflict = require('../models/conflictModel');

// @desc    Access all conflicts for authenticated users
// @route   GET /protected/conflicts
// @access  Private
const getProtectedConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find({});
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a conflict for authenticated users
// @route   POST /protected/conflicts
// @access  Private
const createProtectedConflict = async (req, res) => {
  try {
    const conflict = await Conflict.create(req.body);
    res.status(201).json(conflict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a conflict for authenticated users
// @route   DELETE /protected/conflicts/:conflictId
// @access  Private
const deleteProtectedConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findByIdAndDelete(req.params.conflictId);
    if (conflict) {
      res.json({ message: 'Conflict deleted successfully' });
    } else {
      res.status(404).json({ message: 'Conflict not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProtectedConflicts,
  createProtectedConflict,
  deleteProtectedConflict,
};
