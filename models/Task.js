// models/Task.js
const mongoose = require('mongoose');

// Task schema definition
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['Started', 'Completed', 'Pending'], // Enum for task status
      default: 'Pending', // Default status for a new task
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'], // Enum for task priority
      default: 'Medium', // Default priority level
    },
    deadline: {
      type: Date, // Deadline for task completion
      required: true, // Making deadline a required field
    },
    hoursWorked: {
      type: Number,
      default: 0, // Initialize hours worked
    },
    createdAt: {
      type: Date,
      default: Date.now, // Store the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Store the last updated date
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the User model
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now, // Store the comment creation date
        },
      },
    ],
  },
  { timestamps: true }
);

// Middleware to update the 'updatedAt' field before saving
taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', taskSchema);
