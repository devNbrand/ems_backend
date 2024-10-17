const express = require('express');
const { logWorkHours, getWorkHours } = require("../controllers/workinghours")
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/create', logWorkHours); // Create
router.get('/get', getWorkHours); // Read


module.exports = router;
