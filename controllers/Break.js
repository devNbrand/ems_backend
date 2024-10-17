// controllers/breakController.js
const Break = require('../models/Break');

// Create a new break
exports.startBreak = async (req, res) => {
  try {
    const user = req.user.id; // Get the user ID from the authenticated user
    const { breakType } = req.body; // Extract break type from request body

    // Validate required fields
    if (!breakType) {
      return res.status(400).json({
        success: false,
        message: "Break type is required.",
      });
    }

    // Create a new break record
    const breakRecord = await Break.create({
      user,
      breakStart: new Date(), // Set the current time as break start
      breakType,
    });

    return res.status(201).json({
      success: true,
      break: breakRecord,
      message: "Break started successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// End a break
exports.endBreak = async (req, res) => {
  try {
    const user = req.user.id; // Get the user ID from the authenticated user
    const { breakId } = req.body; // Extract break ID from request body

    // Validate required fields
    if (!breakId) {
      return res.status(400).json({
        success: false,
        message: "Break ID is required to end the break.",
      });
    }

    // Find the break record by ID
    const breakRecord = await Break.findById(breakId);
    if (!breakRecord) {
      return res.status(404).json({
        success: false,
        message: "Break not found.",
      });
    }

    // Check if the break belongs to the user
    if (breakRecord.user.toString() !== user) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to end this break.",
      });
    }

    // Set the end time of the break
    breakRecord.breakEnd = new Date();
    // Calculate duration in minutes
    breakRecord.duration = Math.floor((breakRecord.breakEnd - breakRecord.breakStart) / (1000 * 60)); // Duration in minutes
    await breakRecord.save();

    return res.status(200).json({
      success: true,
      break: breakRecord,
      message: "Break ended successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all breaks for the authenticated user
exports.getUserBreaks = async (req, res) => {
  try {
    const user = req.user.id; // Get the user ID from the authenticated user

    // Find all breaks for the user
    const breaks = await Break.find({ user }).sort({ createdAt: -1 }); // Sort by most recent first

    return res.status(200).json({
      success: true,
      breaks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
