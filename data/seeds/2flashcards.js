exports.seed = function(knex) {
  return knex('flashcards').del()
    .then(function () {
      return knex('flashcards').insert([
        {title: 'First Flashcard'},
      ]);
    });
};
