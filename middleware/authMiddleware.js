const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Custom authentication middleware
const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    // Attach the decoded user object to the request for further use
    req.user = decodedToken;
    next();
  });
};

module.exports = authMiddleware;