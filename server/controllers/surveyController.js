const Survey = require('../models/Survey');

const displaySurveyList = (req, res, next) => {
  Survey.find((err, surveys) => {
    if (err) {
      return console.error(err);
    }

    res.render('survey/list', { surveys });
  });
};

const displayAddSurvey = (req, res, next) => {
  res.render('survey/add');
};

const processAddSurvey = (req, res, next) => {
  let newSurvey = Survey({
    title: req.body.title,
    description: req.body.description,
    questions: {
      question: req.body.question,
      questionType: req.body.questionType,
    },
  });

  Survey.create(newSurvey, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
      return;
    }

    res.status(201).json({ success: true });
  });
};

module.exports = { displaySurveyList, displayAddSurvey, processAddSurvey };
