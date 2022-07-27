const { isTokenValid } = require('../utils/jwt');

const requireAuth = (req, res, next) => {
  console.log('auth required');
  //check if the user has the auth header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ success: false, msg: 'Not authorized' });
  }

  const accessToken = authHeader.split(' ')[1];
  const user = isTokenValid(accessToken);

  if (!user) {
    return res.status(403).json({ success: false, msg: 'Not authorized' });
  }

  console.log('auth passed!');
  req.user = user;
  next();
};

module.exports = { requireAuth };
