/**
 * Add mediaType field to galleries table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.alterTable('galleries', (table) => {
    table.enum('mediaType', ['photo', 'video', 'mixed']).defaultTo('photo').after('category');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.alterTable('galleries', (table) => {
    table.dropColumn('mediaType');
  });
};


