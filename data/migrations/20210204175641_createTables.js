exports.up = function(knex) {
  return knex.schema
  .createTable('administrators', table => {
    table.increments().primary();
    table.string('name').notNull();
    table.timestamps();
  }) 
  .createTable('flashcards', t => {
    t.increments().primary();
    t.string('title').notNull();
    t.text('content');
    t.timestamps();
  }) 
  .createTable('languages', t => {
    t.increments().primary();
    t.string('name').notNull();
    t.boolean('supported').notNull();
    t.timestamps();
  }) 
  .createTable('administrators_languages', t => {
    t.increments().primary();
    t.integer('administrators_id').references('id').inTable('administrators')
      .notNull().onDelete('cascade');
    t.integer('languages_id').references('id').inTable('administrators')
      .notNull().onDelete('cascade');
    t.timestamps();
  }) 
  .createTable('flashcards_languages', t => {
    t.increments().primary();
    t.integer('languages_id').references('id').inTable('languages').notNull()
      .onDelete('cascade');
    t.integer('flashcards_id').references('id').inTable('flashcards').notNull()
      .onDelete('cascade');
    t.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('flashcards_languages')
    .dropTableIfExists('administrators_languages')
    .dropTableIfExists('languages')
    .dropTableIfExists('flashcards')
    .dropTableIfExists('administrators');
};
