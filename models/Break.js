// models/Break.js
const mongoose = require("mongoose");

const breakSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user taking the break
    breakStart: {
      type: Date,
      required: true,
    }, // Start time of the break
    breakEnd: {
      type: Date,
    }, // End time of the break (optional when logging the start)
    duration: {
      type: Number,
      default: 0,
    }, // Calculated break duration in minutes

    breakType: {
      type: String,
      enum: ["lunch", "short", "other"],
      default: "other",
    }, // Type of break (e.g., lunch, short, other)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Break", breakSchema);
