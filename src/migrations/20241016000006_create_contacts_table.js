/**
 * Migration: Create contacts table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('contacts', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Contact information
    table.string('name', 100).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone', 20);
    table.string('subject', 200).notNullable();
    table.text('message').notNullable();
    
    // Status
    table.boolean('read').defaultTo(false);
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    // Soft delete
    table.boolean('isDeleted').defaultTo(false);
    
    // Indexes
    table.index('email');
    table.index('read');
    table.index('createdAt');
    table.index(['read', 'createdAt']);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contacts');
};

