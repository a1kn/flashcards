const db = require('./../../data/db');

module.exports = {
  get() {
    const flashcards = db.select(
      'flashcards.title', 
      'flashcards_languages.content'
    ).from('flashcards').join(
      'flashcards_languages', 
      'flashcards.id', '=', 'flashcards_languages.flashcards_id'
    );
    return flashcards;
  },
}
