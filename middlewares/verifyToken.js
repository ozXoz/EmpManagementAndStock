const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token is not valid' });
      }

      req.user = user; // Attaching user info to the request
      next();
    });
  } else {
    res.status(401).json({ error: 'Authorization token must be provided' });
  }
};

module.exports = verifyToken;
