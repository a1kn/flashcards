const languagesModel = require('../../models/languages');

module.exports = (app) => {
  app.post('/api/languages', async (req, res) => {
    const data = req.body;
    await languagesModel.update(data);
    return res.json().status(200);
  });
};
