const express = require('express');
const router = express.Router();

const {
  displaySurveyList,
  displayAddSurvey,
  processAddSurvey,
  displayEditSurvey,
  processEditSurvey,
  processDeleteSurvey,
} = require('../controllers/surveyController');

router.get('/', displaySurveyList);

router.route('/add').get(displayAddSurvey).post(processAddSurvey);

router.route('/edit/:id').get(displayEditSurvey).post(processEditSurvey);

router.get('/delete/:id', processDeleteSurvey);

module.exports = router;
