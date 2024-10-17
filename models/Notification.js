// models/Notification.js
const mongoose = require('mongoose');

// Notification schema definition
const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Who will receive this notification
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Who triggered the notification (optional)
    },
    type: {
      type: String,
      enum: ['task', 'Social Media Plan', 'Hobby List'], // Type of notification
    },
    message: {
      type: String,
      required: true, // Content of the notification
    },
    isRead: {
      type: Boolean,
      default: false, // Track if the notification is read or not
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Notification', notificationSchema);
