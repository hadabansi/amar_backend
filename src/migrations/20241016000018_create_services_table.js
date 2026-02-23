/**
 * Create services table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('services', (table) => {
    table.increments('id').primary();
    table.string('title', 100).notNullable();
    table.text('description').notNullable();
    table.string('icon', 50).defaultTo('📸');
    table.json('features').defaultTo('[]');
    table.string('price', 50).nullable();
    table.boolean('isActive').defaultTo(true);
    table.integer('displayOrder').defaultTo(0);
    table.boolean('isDeleted').defaultTo(false);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('services');
};


