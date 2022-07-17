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
  const { title, description, questions } = req.body;
  console.log('title', title);
  console.log('description', description);
  console.log('questions', questions);

  let newSurvey = Survey({
    title: title,
    description: description,
    questions: questions,
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
