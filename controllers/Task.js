// controllers/taskController.js
const Task = require("../models/Task");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer")
const User = require('../models/User'); // Assuming there's a User model for fetching user details


// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    pass: process.env.MAIL_PASS,
    user: process.env.MAIL_USER,
  },
 
});

// Function to send email to the recipient and sender
async function sendTaskAssignmentEmails(recipientEmail, senderEmail, taskDetails, assignerDetails, recipientDetails) {
  const recipientMailOptions = {
    from: 'amanupadhyay33822@gmail.com',
    to: recipientEmail,
    subject: `New Task Assigned: ${taskDetails.title}`,
    text: `You have been assigned a new task:
    - Task: ${taskDetails.title}
    - Description: ${taskDetails.description}
    - Priority: ${taskDetails.priority}
    - Deadline: ${taskDetails.deadline}

    Assigned by:
    - Name: ${assignerDetails.username}
    - Email: ${assignerDetails.email}
    
    Please complete the task by the deadline!`,
  };

  const senderMailOptions = {
    from: 'amanupadhyay33822@gmail.com',
    to: senderEmail,
    subject: `Task Assigned: ${taskDetails.title}`,
    text: `You have successfully assigned a new task:
    - Task: ${taskDetails.title}
    - Description: ${taskDetails.description}
    - Priority: ${taskDetails.priority}
    - Deadline: ${taskDetails.deadline}

    Assigned to:
    - Name: ${recipientDetails.username}
    - Email: ${recipientDetails.email}`
  };

  try {
    // Send email to recipient
    await transporter.sendMail(recipientMailOptions);
    console.log('Email sent to recipient: ' + recipientEmail);

    // Send email to sender
    await transporter.sendMail(senderMailOptions);
    console.log('Email sent to sender: ' + senderEmail);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, priority, deadline } = req.body;
    const assignedBy = req.user.id; // Get the ID of the user assigning the task from the authenticated user

    // Validate required fields
    if (!title || !description || !assignedTo || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Title, description, assignedTo, and deadline are required.",
      });
    }

    // Create a new task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy, // Set the user assigning the task
      status,
      priority,
      deadline,
    });

    // Create a notification for the user assigned to the task
    await Notification.create({
      recipient: assignedTo, // The user who will receive the notification
      sender: assignedBy, // The user who assigned the task
      message: `You have been assigned a new task: ${title}`,
    });

    // Fetch the emails of the assigned user and the user who assigned the task
    const assignedUser = await User.findById(assignedTo);
    const assignerUser = await User.findById(assignedBy);

    // Send email notifications to both the assigned user and the assigner
    if (assignedUser && assignedUser.email && assignerUser && assignerUser.email) {
      await sendTaskAssignmentEmails(
        assignedUser.email, 
        assignerUser.email, 
        task, 
        assignerUser, 
        assignedUser
      );
    }

    return res.status(201).json({
      success: true,
      task,
      message: "Task created, assigned successfully, and email notifications sent to both users.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all tasks (with pagination or filtering logic can be added as needed)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo assignedBy", "username") // Populate user details
      .sort({ createdAt: -1 }); // Optional: Sort tasks by creation date

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params; // Get the task ID from request parameters

    const task = await Task.findById(id).populate(
      "assignedTo assignedBy",
      "username"
    ); // Populate user details
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Get the task ID from request parameters
    const updates = req.body; // Get the updates from the request body

    // Find and update the task
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      task,
      message: "Task updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Get the task ID from request parameters

    // Find and delete the task
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
