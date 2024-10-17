// controllers/availabilityHoursController.js
const AvailabilityHours = require('../models/AvailabilityHours');

// Create a new availability record
exports.createAvailability = async (req, res) => {
  try {
    const { date, availableTimes } = req.body;
    const user = req.user.id; // Get the user ID from the authenticated user

    // Validate required fields
    if (!date || !availableTimes || !Array.isArray(availableTimes) || availableTimes.length === 0) {
      return res.status(403).send({
        success: false,
        message: "Date and available times are required",
      });
    }

    // Create the availability record
    const availability = await AvailabilityHours.create({
      user,
      date,
      availableTimes,
    });

    return res.status(201).json({
      success: true,
      availability,
      message: "Availability hours created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all availability records for the authenticated user
exports.getUserAvailability = async (req, res) => {
  try {
    const user = req.user.id; // Get the user ID from the authenticated user

    const availability = await AvailabilityHours.find({ user }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      availability,
      message: "Availability hours fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an existing availability record
exports.updateAvailability = async (req, res) => {
  try {
    const { id } = req.params; // availability record ID
    const updatedData = req.body;

    // Validate required fields
    if (!updatedData) {
      return res.status(403).send({
        success: false,
        message: "Data to update is required",
      });
    }

    const updatedAvailability = await AvailabilityHours.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedAvailability) {
      return res.status(404).json({
        success: false,
        message: "Availability hours not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedAvailability,
      message: "Availability hours updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an availability record
exports.deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params; // availability record ID

    const deletedAvailability = await AvailabilityHours.findByIdAndDelete(id);

    if (!deletedAvailability) {
      return res.status(404).json({
        success: false,
        message: "Availability hours not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Availability hours deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
