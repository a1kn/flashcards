exports.up = function(knex) {
  return knex.schema
  .createTable('administrators', t => {
    t.increments().primary();
    t.string('name').notNull();
    t.timestamps(false, true);
  }) 
  .createTable('flashcards', t => {
    t.increments().primary();
    t.string('title').notNull();
    t.timestamps(false, true);
  }) 
  .createTable('languages', t => {
    t.increments().primary();
    t.string('name').notNull();
    t.boolean('enabled').notNull();
    t.timestamps(false, true);
  }) 
  .createTable('administrators_languages', t => {
    t.increments().primary();
    t.integer('administrators_id').references('id').inTable('administrators')
      .notNull().onDelete('cascade');
    t.integer('languages_id').references('id').inTable('administrators')
      .notNull().onDelete('cascade');
    t.timestamps(false, true);
  }) 
  .createTable('flashcards_languages', t => {
    t.increments().primary();
    t.integer('languages_id').references('id').inTable('languages').notNull()
      .onDelete('cascade');
    t.integer('flashcards_id').references('id').inTable('flashcards').notNull()
      .onDelete('cascade');
    t.string('title');
    t.text('content');
    t.timestamps(false, true);
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
