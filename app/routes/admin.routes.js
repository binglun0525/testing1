module.exports = (app) => {
  const Admin = require('../controllers/admin.controllers.js');
  app.get('/admin/getSingleMatchData', Admin.getSingleMatchData);
  app.get('/admin/getEntireTournament', Admin.getEntireTournament);
  app.get('/admin/getAllMatchesFromSpecifiedStage', Admin.getAllMatchesFromSpecifiedStage);

}
