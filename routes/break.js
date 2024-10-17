const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { startBreak, endBreak, getUserBreaks } = require('../controllers/Break');
const router = express.Router();

// Route to start a break
router.post('/start', verifyToken, startBreak);

// Route to end a break
router.post('/end', verifyToken, endBreak);

// Route to get all breaks for the authenticated user
router.get('/get', verifyToken, getUserBreaks);

module.exports = router;
