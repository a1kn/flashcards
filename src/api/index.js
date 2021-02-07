const getFlashcards = require('./routes/getFlashcards');
const postFlashcards = require('./routes/postFlashcards');
const getIndex= require('./routes/getIndex');
const getLanguages = require('./routes/getLanguages');

module.exports = (app) => {
  getIndex(app);
  getLanguages(app);
  getFlashcards(app);
  postFlashcards(app);
  return app;
};
