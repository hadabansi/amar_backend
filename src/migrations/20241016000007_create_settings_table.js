/**
 * Migration: Create settings table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('settings', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Studio information
    table.string('siteName', 255).notNullable().defaultTo('Amar Digital Studio');
    table.string('email', 255).notNullable();
    table.string('phone', 20).notNullable();
    table.text('address').notNullable();
    table.string('owners', 255).notNullable();
    
    // Social media (JSON field)
    table.json('socialMedia');
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('settings');
};

