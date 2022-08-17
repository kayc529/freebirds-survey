const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['TEXT', 'T_F', 'OPTIONS', 'CHECKBOX'],
    default: 'TEXT',
    required: true,
  },
  options: {
    type: [String],
  },
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Survey', surveySchema);
