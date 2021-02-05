const db = require('./../../data/db');

module.exports = {
  get() {
    const flashcards = db.select('title').from('flashcards');
    return flashcards;
  },
}
