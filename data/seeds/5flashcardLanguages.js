exports.seed = function(knex) {
  return knex('flashcards_languages').del()
    .then(function () {
      return knex('flashcards_languages').insert([
        {languages_id: 1, flashcards_id: 1, content: 'Hello World!'},
        {languages_id: 2, flashcards_id: 1, title: 'Primera Tarjeta', content: '¡Hola Mundo!'},
      ]);
    });
};
