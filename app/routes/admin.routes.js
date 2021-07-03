module.exports = (app) => {
  const Admin = require('../controllers/admin.controllers.js');

  app.get('/admin/bingluntesting', Admin.bingluntesting);

}
