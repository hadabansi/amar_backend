/**
 * Migration: Create testimonials table
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('testimonials', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Testimonial fields
    table.string('name', 100).notNullable();
    table.string('role', 100).notNullable();
    table.text('content').notNullable();
    table.integer('rating').notNullable().unsigned();
    
    // Customer image
    table.text('imageUrl');
    table.string('imagePublicId', 255);
    
    // Approval
    table.boolean('approved').defaultTo(false);
    
    // Timestamps
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    // Soft delete
    table.boolean('isDeleted').defaultTo(false);
    
    // Indexes
    table.index('approved');
    table.index('rating');
    table.index('createdAt');
    table.index(['approved', 'rating']);
    
    // Check constraint for rating (1-5)
    table.check('?? >= 1 AND ?? <= 5', ['rating', 'rating']);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('testimonials');
};

