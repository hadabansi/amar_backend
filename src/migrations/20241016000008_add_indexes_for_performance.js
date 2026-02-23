/**
 * Migration: Add additional indexes for performance optimization
 * @param {import('knex').Knex} knex
 */
exports.up = async function(knex) {
  // Add composite indexes for common queries
  
  // Galleries - frequently queried by category and featured status
  await knex.schema.table('galleries', function(table) {
    table.index(['isDeleted', 'featured', 'category'], 'idx_galleries_active_featured_category');
  });
  
  // Photos - frequently queried by gallery
  await knex.schema.table('photos', function(table) {
    table.index(['galleryId', 'isDeleted'], 'idx_photos_gallery_active');
  });
  
  // Testimonials - frequently queried by approved status
  await knex.schema.table('testimonials', function(table) {
    table.index(['approved', 'isDeleted', 'rating'], 'idx_testimonials_approved_active_rating');
  });
  
  // Bookings - frequently queried by status and date
  await knex.schema.table('bookings', function(table) {
    table.index(['status', 'date', 'isDeleted'], 'idx_bookings_status_date_active');
  });
  
  // Contacts - frequently queried by read status
  await knex.schema.table('contacts', function(table) {
    table.index(['read', 'isDeleted', 'createdAt'], 'idx_contacts_read_active_created');
  });
  
  console.log('✅ Performance indexes added');
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function(knex) {
  await knex.schema.table('galleries', function(table) {
    table.dropIndex([], 'idx_galleries_active_featured_category');
  });
  
  await knex.schema.table('photos', function(table) {
    table.dropIndex([], 'idx_photos_gallery_active');
  });
  
  await knex.schema.table('testimonials', function(table) {
    table.dropIndex([], 'idx_testimonials_approved_active_rating');
  });
  
  await knex.schema.table('bookings', function(table) {
    table.dropIndex([], 'idx_bookings_status_date_active');
  });
  
  await knex.schema.table('contacts', function(table) {
    table.dropIndex([], 'idx_contacts_read_active_created');
  });
};

