const getFlashcards = require('./routes/getFlashcards');

module.exports = (app) => {
  getFlashcards(app);
  return app;
};
