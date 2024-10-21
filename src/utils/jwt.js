const jwt = require('jsonwebtoken');

// Create a JWT token for a user
function createToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
}

module.exports = { createToken };
