const express = require('express');
const router = express.Router();

const {
  displaySurveyList,
  displayAddSurvey,
  processAddSurvey,
} = require('../controllers/surveyController');

router.get('/', displaySurveyList);

router.route('/add').get(displayAddSurvey).post(processAddSurvey);

router.route('/edit/:id').get().post();

router.delete('/delete/:id');

module.exports = router;
