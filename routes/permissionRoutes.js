const express = require('express');
const router = express.Router();

// PUT route for updating user permission
router.put('/admin/users/:userId/permissions/:permission', async (req, res) => {
  try {
    const userId = req.params.userId;
    const permission = req.params.permission;
    const allowed = req.body.allowed;

    // Update the user's permission in the database (implement this logic)
    // Example: User.updatePermission(userId, permission, allowed);

    // Send a success response
    res.json({ message: 'Permission updated successfully' });
  } catch (error) {
    console.error('Error updating permission:', error);
    // Handle errors and send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
