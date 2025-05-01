const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, getUsers, verifyEmail, blockUser } = require('../Controllers/authController');
const { protect } = require("../Middleware/authMiddleware");
const { authorizeRoles } = require("../Middleware/roleMiddleware")

router.post('/signup', signup);
router.post('/login', login);
router.patch('/update/:id', protect, updateProfile);
router.get('/users', protect, getUsers)
router.get('/verify-email/:token', verifyEmail);
router.patch('/block/:id', protect, authorizeRoles, blockUser);


module.exports = router;
