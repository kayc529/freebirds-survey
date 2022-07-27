const User = require('../models/User');
const { createTokenUser, createAccessToken } = require('../utils/jwt');

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(401).json({ success: false, msg: 'Invalid Credentials' });
  }

  const isMatch = await user.comparePasswords(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, msg: 'Invalid Credentials' });
  }

  const tokenUser = createTokenUser(user);
  const accessToken = createAccessToken({ user: tokenUser });

  res.status(200).json({ success: true, user: tokenUser, accessToken });
};

const registerUser = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const newUser = { username, password, firstName, lastName, email };
  try {
    const user = await User.create(newUser);
    const tokenUser = createTokenUser(user);
    const accessToken = createAccessToken({ user: tokenUser });
    res.status(201).json({ success: true, user: tokenUser, accessToken });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Failed to register user' });
  }
};

const logoutUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'user logged out' });
};

const getAllUsers = (req, res, next) => {
  res.status(200).send('get all users');
};

const getUser = (req, res, next) => {
  const userId = req.params.id;
  res.status(200).send('get user');
};

const updateUser = (req, res, next) => {
  const userId = req.params.id;
  res.status(200).send('update user');
};

const deleteUser = (req, res, next) => {
  const userId = req.params.id;
  res.status(200).send('delete user');
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  logoutUser,
};
