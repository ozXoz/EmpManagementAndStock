// routes/logout.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken'); // Import verifyToken middleware

// Route to handle user logout
router.post('/logout', verifyToken, (req, res) => {
  // You can implement your logout logic here
  // For example, if you are using JWT tokens, you can invalidate the token

  if (req.user) {
    // User is authenticated, you can perform token invalidation logic here.
    // For example, if using JWT, you can blacklist the token or mark it as invalid.
    
    // Send a success response
    console.log('User logged out successfully');
    return res.status(200).json({ message: 'Logout successful' });
  } else {
    // If no user is found, send an error response
    console.log('Logout failed: User not found');
    return res.status(400).json({ error: 'Logout failed' });
  }
});

module.exports = router;
