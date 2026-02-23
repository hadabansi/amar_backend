/**
 * Migration: Update image URL columns to TEXT to support base64
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable('galleries', function(table) {
      table.text('coverImageUrl').alter();
    })
    .alterTable('photos', function(table) {
      table.text('imageUrl').alter();
    })
    .alterTable('testimonials', function(table) {
      table.text('imageUrl').alter();
    });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('galleries', function(table) {
      table.string('coverImageUrl', 500).alter();
    })
    .alterTable('photos', function(table) {
      table.string('imageUrl', 500).alter();
    })
    .alterTable('testimonials', function(table) {
      table.string('imageUrl', 500).alter();
    });
};

