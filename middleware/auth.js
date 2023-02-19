const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Sem token, autorização negada' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'O token não é válido' });
  }
};
