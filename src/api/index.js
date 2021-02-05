const getFlashcards = require('./routes/getFlashcards');
const postFlashcards = require('./routes/postFlashcards');

module.exports = (app) => {
  getFlashcards(app);
  postFlashcards(app);
  return app;
};
