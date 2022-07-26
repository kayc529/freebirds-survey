const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.route('/:id').get(getUser).post(updateUser).delete(deleteUser);

module.exports = router;
