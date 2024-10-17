// models/AvailabilityHours.js
const mongoose = require('mongoose');

// Availability hours schema definition
const availabilityHoursSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    date: {
      type: Date,
      required: true, // Required to track availability for a specific date
    },
    availableTimes: [
      {
        startTime: {
          type: Date,
          required: true, // Required to track when availability starts
        },
        endTime: {
          type: Date,
          required: true, // Required to track when availability ends
        },
      },
    ],
    notes: {
      type: String,
      trim: true, // Optional notes regarding availability
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AvailabilityHours', availabilityHoursSchema);
