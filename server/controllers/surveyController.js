const Survey = require('../models/Survey');

const displaySurveyList = (req, res, next) => {
  Survey.find((err, surveys) => {
    if (err) {
      return console.error(err);
    }

    res.render('survey/list', { title: 'Survey', surveys });
  });
};

const displayAddSurvey = (req, res, next) => {
  res.render('survey/add', { title: 'Add New Survey' });
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

const displayEditSurvey = (req, res, next) => {
  const surveyId = req.params.id;
  Survey.findById({ _id: surveyId }, (err, surveyToEdit) => {
    if (err) {
      console.log(err);
      return res.end(err);
    }

    res.render('survey/edit', {
      title: 'Edit Survey',
      survey: surveyToEdit,
    });
  });
};

const processEditSurvey = (req, res, next) => {
  const surveyToUpdate = req.body;
  console.log(surveyToUpdate);
  Survey.updateOne({ _id: surveyToUpdate._id }, surveyToUpdate, (err) => {
    if (err) {
      console.log(err);
      return res.end(err);
    } else {
      res.status(200).json({ success: true });
    }
  });
};

const processDeleteSurvey = (req, res, next) => {
  let surveyId = req.params.id;
  Survey.remove({ _id: surveyId }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the survey list
      res.redirect('/survey');
    }
  });
};

module.exports = {
  displaySurveyList,
  displayAddSurvey,
  processAddSurvey,
  displayEditSurvey,
  processEditSurvey,
  processDeleteSurvey,
};
