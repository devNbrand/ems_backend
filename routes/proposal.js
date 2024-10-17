const express = require('express');

const { createProposal } = require('../controllers/Proposal');
const router = express.Router();

// Route to start a break
router.post('/create',createProposal);

// Route to end a break


module.exports = router;
