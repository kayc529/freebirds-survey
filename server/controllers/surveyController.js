const Survey = require('../models/Survey');
const SurveyResponse = require('../models/SurveyResponse');

const displaySurveyList = (req, res, next) => {
  Survey.find((err, surveys) => {
    if (err) {
      console.log(err);
      return res.status(500).send('something went wrong');
    }

    res.status(200).json({ success: true, surveys });
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
      return res.status(500).send('Something went wrong');
    }

    res.status(201).json({ success: true });
  });
};

const displayEditSurvey = (req, res, next) => {
  const surveyId = req.params.id;
  Survey.findById({ _id: surveyId }, (err, surveyToEdit) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }

    // res.render('survey/edit', {
    //   title: 'Edit Survey',
    //   survey: surveyToEdit,
    // });
    res.status(200).json({ success: true, survey: surveyToEdit });
  });
};

const processEditSurvey = (req, res, next) => {
  const surveyToUpdate = req.body;
  Survey.updateOne({ _id: surveyToUpdate._id }, surveyToUpdate, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
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
      return res.status(500).send('Something went wrong');
    } else {
      // refresh the survey list
      // res.redirect('/survey');
      res.status(200).json({ success: true });
    }
  });
};

const displayDoSurvey = (req, res, next) => {
  let surveyId = req.params.id;
  Survey.findById({ _id: surveyId }, (err, survey) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }

    // res.render('survey/do-survey', { survey });
    res.status(200).json({ success: true, survey });
  });
};

const processDoSurvey = (req, res, next) => {
  const { surveyId, answers } = req.body;
  const newSurveyResponse = SurveyResponse({
    surveyId,
    answers,
  });

  SurveyResponse.create(newSurveyResponse, (err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }

    res.status(200).json({ success: true });
  });
};

const displaySurveyResults = (req, res, next) => {
  const surveyId = req.params.id;

  Survey.findById({ _id: surveyId }, (err, survey) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }

    SurveyResponse.find({ surveyId: surveyId }, (err, responses) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Something went wrong');
      }

      // res.render('survey/survey-results', {
      //   title: 'Survey Results',
      //   survey,
      //   responses,
      // });
      res.status(200).json({ success: true, responses });
    });
  });
};

const getAllSurveyResults = (req, res, next) => {
  SurveyResponse.find({}, (err, responses) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }

    res.status(200).json({ success: true, responses });
  });
};

module.exports = {
  displaySurveyList,
  displayAddSurvey,
  processAddSurvey,
  displayEditSurvey,
  processEditSurvey,
  processDeleteSurvey,
  displayDoSurvey,
  processDoSurvey,
  displaySurveyResults,
  getAllSurveyResults,
};
