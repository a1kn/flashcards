exports.seed = function(knex) {
  return knex('administrators').del()
    .then(function () {
      return knex('administrators').insert([
        {name: 'Admin'},
      ]);
    });
};
