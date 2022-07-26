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

const requireAuth = (res, req, next) => {
  //check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }

  next();
};

router.get('/', displaySurveyList);

router.route('/add').post(requireAuth, processAddSurvey);

router
  .route('/edit/:id')
  .get(displayEditSurvey)
  .post(requireAuth, processEditSurvey);

router.delete('/delete/:id', requireAuth, processDeleteSurvey);

router.route('/do-survey/:id').get(displayDoSurvey).post(processDoSurvey);

router.get('/results', requireAuth, getAllSurveyResults);

router.get('/results/:id', displaySurveyResults);

module.exports = router;
