exports.seed = function(knex) {
  return knex('flashcards_languages').del()
    .then(function () {
      return knex('flashcards_languages').insert([
        {languages_id: 1, flashcards_id: 1, content: 'Hello World!'},
        {languages_id: 2, flashcards_id: 1, title: 'Primera Tarjeta', content: '¡Hola Mundo!'},
        {languages_id: 1, flashcards_id: 2, title: 'Second', content: 'Hello Brother!'},
        {languages_id: 2, flashcards_id: 2, title: 'Segunda Tarjeta', content: '¡Hola Hijo!'},
        {languages_id: 1, flashcards_id: 3, content: 'Hi!'},
      ]);
    });
};
