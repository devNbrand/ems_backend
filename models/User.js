const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  equity: {
    type: Number,
    default: 0,
  },
  tasksCompleted: {
    type: Number,
    default: 0, // Initialize with 0
  },
  totalHoursWorked: {
    type: Number,
    default: 0, // Initialize with 0
  },
  assignedRole: {
    type: String,
    enum: ["CEO", "COO", "CTO", "Partner", "Co-CEO", "Co-COO", "Co-CTO"],
    default: "Partner",
  },
  status: {
    type: String,
    enum: ["Available", "Busy", "Ofline"],
  },
});

module.exports = mongoose.model("User", UserSchema);
