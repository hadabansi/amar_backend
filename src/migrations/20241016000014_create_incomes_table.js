/**
 * Migration: Create incomes table for daily income tracking
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('incomes', function(table) {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.string('source', 255).notNullable();
    table.string('category', 100).nullable();
    table.text('description').nullable();
    table.boolean('isDeleted').defaultTo(false);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    
    table.index('date');
    table.index('isDeleted');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable('incomes');
};

