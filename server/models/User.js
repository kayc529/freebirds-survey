const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Username is required',
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: 'Email is required',
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

//config options for User Model
let options = { missingPasswordError: 'Wrong/Missing password' };

userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', userSchema);
