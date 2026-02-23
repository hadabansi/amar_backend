/**
 * Migration: Create bookings table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('bookings', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Customer information
    table.string('name', 100).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone', 20);
    
    // Booking details
    table.string('service', 255).notNullable();
    table.date('date').notNullable();
    table.string('time', 20);
    table.text('message');
    
    // Status
    table.enum('status', ['pending', 'confirmed', 'completed', 'cancelled']).defaultTo('pending');
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    // Soft delete
    table.boolean('isDeleted').defaultTo(false);
    
    // Indexes
    table.index('email');
    table.index('status');
    table.index('date');
    table.index('service');
    table.index('createdAt');
    table.index(['status', 'date']);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('bookings');
};

