const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// ✅ Registration Route
router.post('/register', registerUser);



module.exports = router;

