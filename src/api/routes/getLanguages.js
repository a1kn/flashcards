const languagesModel = require('../../models/languages');

module.exports = (app) => {
  app.get('/api/languages', async (req, res) => {
    const languages = await languagesModel.get();
    return res.json(languages).status(200);
  });
};
