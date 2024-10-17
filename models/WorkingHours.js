// models/WorkingHours.js
const mongoose = require('mongoose');

// Working hours schema definition
const workingHoursSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    date: {
      type: Date,
      required: true, // Required to track working hours for a specific date
    },
    workSessions: [
      {
        startTime: {
          type: Date,
          required: true, // Required to track when work starts
        },
        endTime: {
          type: Date,
          required: true, // Required to track when work ends
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkingHours', workingHoursSchema);
