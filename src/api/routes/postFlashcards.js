const flashcardsModel = require('../../models/flashcards');

module.exports = (app) => {
  app.post('/api/flashcards', async (req, res) => {
    const data = req.body;
    const addToDb = await flashcardsModel.create(
      data.title, data.content, data.locals
    );
    return res.json(addToDb).status(200);
  });
};
