const getFlashcards = require('./routes/getFlashcards');
const postFlashcards = require('./routes/postFlashcards');
const getIndex= require('./routes/getIndex');

module.exports = (app) => {
  getIndex(app);
  getFlashcards(app);
  postFlashcards(app);
  return app;
};
