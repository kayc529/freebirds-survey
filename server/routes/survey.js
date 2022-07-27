const express = require('express');
const router = express.Router();

const {
  displaySurveyList,
  processAddSurvey,
  displayEditSurvey,
  processEditSurvey,
  processDeleteSurvey,
  displayDoSurvey,
  processDoSurvey,
  displaySurveyResults,
  getAllSurveyResults,
} = require('../controllers/surveyController');

//auth middleware
const { requireAuth } = require('../middleware/authentication');

router.get('/', displaySurveyList);

router.route('/add').post(requireAuth, processAddSurvey);

router
  .route('/edit/:id')
  .get(requireAuth, displayEditSurvey)
  .post(requireAuth, processEditSurvey);

router.delete('/delete/:id', requireAuth, processDeleteSurvey);

router.route('/do-survey/:id').get(displayDoSurvey).post(processDoSurvey);

router.get('/results', requireAuth, getAllSurveyResults);

router.get('/results/:id', displaySurveyResults);

module.exports = router;
