const Proposal = require("../models/Proposal"); // Adjust the path to your Proposal model
const nodemailer = require("nodemailer"); // Import Nodemailer

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      pass: process.env.MAIL_PASS,
      user: process.env.MAIL_USER,
    },
   
  });
  

// Controller function to create a new proposal
exports.createProposal = async (req, res) => {
    try {
        // Destructure the request body to get proposal data
        const { fullName, email, contactNumber, budget, description } = req.body;

        // Validating data
        if (!fullName || !email || !contactNumber || !budget) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Create a new proposal instance
        const newProposal = new Proposal({
            fullName,
            email,
            contactNumber,
            budget,
            description,
        });

        // Save the proposal to the database
        await newProposal.save();

        // Email options
        const mailOptions = {
            from: 'amanupadhyay33822@gmail.com', // Sender address
            to: "amanu0181@gmail.com", // Recipient address
            subject: "New Proposal Submission", // Subject line
            text: `New proposal submitted by ${fullName}\n\nDetails:\nEmail: ${email}\nContact Number: ${contactNumber}\nBudget: ${budget}\nDescription: ${description}`, // Plain text body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Respond with the created proposal data
        return res.status(201).json({
            success: true,
            message: "Proposal created successfully and email sent!",
            proposal: newProposal,
        });
    } catch (error) {
        // Handle errors and send appropriate responses
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(409).json({ 
                success: false, 
                message: "Email already exists" 
            });
        }

        // Log the error for debugging
        console.error(error);

        // General server error response
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};
