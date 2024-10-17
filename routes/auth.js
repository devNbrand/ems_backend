const express = require("express")
const { login, signup, logout } = require("../controllers/Auth")
const router = express.Router()


// Route for user signup
router.post("/login", login)
router.post("/signup", signup)
router.get("/logout", logout)

module.exports = router