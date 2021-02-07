const getFlashcards = require('./routes/getFlashcards');
const addFlashcard = require('./routes/postFlashcards');
const getIndex= require('./routes/getIndex');
const getLanguages = require('./routes/getLanguages');
const updateFlashcard = require('./routes/updateFlashcard');
const updateLanguages = require('./routes/updateLanguages');

module.exports = (app) => {
  getIndex(app);
  getLanguages(app);
  getFlashcards(app);
  addFlashcard(app);
  updateFlashcard(app);
  updateLanguages(app);
  return app;
};
