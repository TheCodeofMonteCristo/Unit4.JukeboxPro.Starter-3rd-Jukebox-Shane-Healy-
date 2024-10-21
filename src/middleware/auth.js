const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user to request
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user; // Attach user info to request
    next(); // Call the next middleware or route handler
  });
}

module.exports = authenticate;
