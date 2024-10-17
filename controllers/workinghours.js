// controllers/workingHoursController.js
const WorkingHours = require('../models/WorkingHours');

// Create or update work hours for a specific date
exports.logWorkHours = async (req, res) => {
  try {
    const user = req.user.id; // Get the user ID from the authenticated user
    const { date, workSessions } = req.body;

    // Validate required fields
    if (!date || !workSessions || !Array.isArray(workSessions) || workSessions.length === 0) {
      return res.status(403).send({
        success: false,
        message: "Date and work sessions are required",
      });
    }

    // Find existing work hours for the user on that date
    let workingHours = await WorkingHours.findOne({ user, date });

    if (workingHours) {
      // If a record exists, update it
      workingHours.workSessions.push(...workSessions); // Add new sessions to the existing ones
      workingHours = await workingHours.save();
    } else {
      // If no record exists, create a new one
      workingHours = await WorkingHours.create({
        user,
        date,
        workSessions,
      });
    }

    return res.status(200).json({
      success: true,
      workingHours,
      message: "Work hours logged successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get work hours for a specific date
exports.getWorkHours = async (req, res) => {
    try {
      const user = req.user.id; // Get the user ID from the authenticated user
      const { date } = req.query; // Get date from query parameters
  
      // Validate required fields
      if (!date) {
        return res.status(403).send({
          success: false,
          message: "Date is required",
        });
      }
  
      const workingHours = await WorkingHours.findOne({ user, date });
  
      if (!workingHours) {
        return res.status(404).json({
          success: false,
          message: "No work hours found for the specified date",
        });
      }
  
      return res.status(200).json({
        success: true,
        workingHours,
        message: "Work hours retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  