const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/surveyController');

router.get('/', displaySurveyList);

router.route('/add').post(processAddSurvey);

router.route('/edit/:id').get(displayEditSurvey).post(processEditSurvey);

router.get('/delete/:id', processDeleteSurvey);

router.route('/do-survey/:id').get(displayDoSurvey).post(processDoSurvey);

router.get('/results', getAllSurveyResults);

router.get('/results/:id', displaySurveyResults);

module.exports = router;
