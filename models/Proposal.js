const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber:{
    type: String,
    required: true,
  },
  budget: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // Status options
},
description:{
    type: String,
}
});

module.exports = mongoose.model("Proposal", ProposalSchema);
