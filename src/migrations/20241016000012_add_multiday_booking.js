/**
 * Migration: Add multi-day booking support
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.date('endDate').after('date');
    table.integer('numberOfDays').defaultTo(1).after('endDate');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.dropColumn('endDate');
    table.dropColumn('numberOfDays');
  });
};

