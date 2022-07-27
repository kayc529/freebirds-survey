const jwt = require('jsonwebtoken');
const db = require('../config/db');

const createTokenUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

const createAccessToken = (user) => {
  const accessToken = jwt.sign(user, db.Secret);
  return accessToken;
};

const isTokenValid = (accessToken) => {
  const user = jwt.verify(accessToken, db.Secret);
  return user;
};

module.exports = { createTokenUser, createAccessToken, isTokenValid };
