const mongoose = require('mongoose');

const surveyResponseSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Types.ObjectId,
    ref: 'Survey',
  },
  answers: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('SurveyResponse', surveyResponseSchema);
