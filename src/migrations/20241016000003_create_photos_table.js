/**
 * Migration: Create photos table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('photos', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Photo fields
    table.string('title', 100).notNullable();
    table.text('description');
    
    // Image data
    table.text('imageUrl').notNullable();
    table.string('imagePublicId', 255);
    table.integer('imageWidth');
    table.integer('imageHeight');
    
    // Foreign key to galleries
    table.integer('galleryId').unsigned().notNullable();
    table.foreign('galleryId')
      .references('id')
      .inTable('galleries')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    // Soft delete
    table.boolean('isDeleted').defaultTo(false);
    
    // Indexes
    table.index('galleryId');
    table.index('createdAt');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('photos');
};

