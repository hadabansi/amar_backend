/**
 * Migration: Create users table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // User fields
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.enum('role', ['admin', 'user']).defaultTo('admin');
    
    // Secret ID for JWT (like beamme)
    table.uuid('secretId').notNullable().unique().defaultTo(knex.raw('(UUID())'));
    
    // JWT token tracking
    table.text('jwtToken');
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    // Soft delete
    table.boolean('isDeleted').defaultTo(false);
    
    // Indexes
    table.index('email');
    table.index('role');
    table.index('secretId');
    table.index('createdAt');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

