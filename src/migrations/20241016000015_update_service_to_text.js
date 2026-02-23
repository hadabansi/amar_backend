/**
 * Migration: Update service column to TEXT to support multiple services
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.text('service').alter();
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.string('service', 255).alter();
  });
};

