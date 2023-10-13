module.exports = (req, res, next) => {
  // Check if the user has an "admin" role
  console.log('User role:', req.user ? req.user.role : 'No user');
  if (req.user && req.user.role === 'admin') {
    // User has admin privileges, so allow the request to proceed
    next();
  } else {
    // User does not have admin privileges, send an unauthorized response
    console.log('Unauthorized access:', req.path);
    res.status(403).json({ error: 'Unauthorized access' });
  }
};
