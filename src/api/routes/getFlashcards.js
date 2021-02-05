const flashcardsModel = require('../../models/flashcards');

module.exports = (app) => {
  app.get('/api/flashcards', async (req, res) => {
    const flashcards = await flashcardsModel.get();
    return res.json(flashcards).status(200);
  });
};
