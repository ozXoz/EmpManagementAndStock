const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({ error: 'Token is not valid' });
      }

      console.log('Decoded user:', decoded);

      req.user = {
        _id: decoded._id,
        role: decoded.role,
        permissions: decoded.permissions, // Set permissions object
      };
      next();
    });
  } else {
    res.status(401).json({ error: 'Authorization token must be provided' });
  }
};

module.exports = verifyToken;
