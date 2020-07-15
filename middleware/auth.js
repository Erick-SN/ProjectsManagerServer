const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //Read token from header
  const token = req.header('x-auth-token');
  //Check if the token exist
  if (!token) {
    return res.status(401).json({ msg: 'Permission denied' });
  }
  //Token validation
  try {
    const key = jwt.verify(token, process.env.SECRET);
    req.user = key.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'No valid token' });
  }
};
