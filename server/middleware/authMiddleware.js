// --- server/middleware/authMiddleware.js ---

const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  
  // 1. Check if the request has an authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Get the token from the header (e.g., "Bearer 12345...")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. If valid, attach the user's info to the request object
      // We'll use this info in our item controller
      req.user = decoded; // This contains the user's { id, community }

      // 5. Call "next()" to pass the request to the *next* function (the item controller)
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };