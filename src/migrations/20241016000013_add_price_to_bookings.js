/**
 * Migration: Add price field to bookings
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.decimal('price', 10, 2).nullable().after('numberOfDays');
    table.text('adminNotes').nullable().after('price');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.alterTable('bookings', function(table) {
    table.dropColumn('price');
    table.dropColumn('adminNotes');
  });
};

