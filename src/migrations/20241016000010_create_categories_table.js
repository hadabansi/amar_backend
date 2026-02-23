/**
 * Migration: Create categories table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('categories', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Category fields
    table.string('name', 100).notNullable().unique();
    table.string('slug', 100).notNullable().unique();
    table.text('description');
    table.string('icon', 50).defaultTo('📸');
    
    // Status
    table.boolean('isActive').defaultTo(true);
    table.boolean('isDeleted').defaultTo(false);
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    // Indexes
    table.index('slug');
    table.index('isActive');
    table.index(['isDeleted', 'isActive']);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories');
};

