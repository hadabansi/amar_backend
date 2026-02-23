/**
 * Migration: Create galleries table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('galleries', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Gallery fields
    table.string('title', 100).notNullable();
    table.text('description').notNullable();
    table.enum('category', ['wedding', 'portrait', 'event', 'commercial', 'engagement', 'maternity']).notNullable();
    
    // Cover image
    table.text('coverImageUrl');
    table.string('coverImagePublicId', 255);
    
    // Features
    table.boolean('featured').defaultTo(false);
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    // Soft delete
    table.boolean('isDeleted').defaultTo(false);
    
    // Indexes
    table.index('category');
    table.index('featured');
    table.index('createdAt');
    table.index(['category', 'featured']);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('galleries');
};

