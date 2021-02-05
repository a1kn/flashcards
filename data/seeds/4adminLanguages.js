exports.seed = function(knex) {
  return knex('administrators_languages').del()
    .then(function () {
      return knex('administrators_languages').insert([
        {administrators_id: 1, languages_id: 1},
        {administrators_id: 1, languages_id: 2},
      ]);
    });
};
