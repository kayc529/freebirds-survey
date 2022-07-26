const User = require('../models/User');
const passport = require('passport');

const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: 'Authentication Error' });
    }

    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      res.status(200).json({ success: true, user: user });
    });
  })(req, res, next);
};

const registerUser = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    firstName: req.body.username,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, msg: 'failed to register user' });
    }

    return passport.authenticate('local')(req, res, () => {
      res.status(201).json({ success: true, user: user });
    });
  });
};

const logoutUser = (req, res, next) => {
  req.logout();
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
