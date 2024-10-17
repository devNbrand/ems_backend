const express = require('express');
const { createAvailability, getUserAvailability, updateAvailability, deleteAvailability } = require("../controllers/availablehours")
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/create', createAvailability); // Create
router.get('/get', getUserAvailability); // Read
router.put('/update/:id', updateAvailability); // Update
router.delete('/del/:id', deleteAvailability); // Delete

module.exports = router;
