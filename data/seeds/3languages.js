exports.seed = function(knex) {
  return knex('languages').del()
    .then(function () {
      return knex('languages').insert([
        {name: 'English', enabled: true},
        {name: 'Spanish', enabled: true},
        {name: 'German', enabled: false},
      ]);
    });
};
