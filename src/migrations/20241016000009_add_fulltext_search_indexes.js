/**
 * Migration: Add fulltext search indexes
 * @param {import('knex').Knex} knex
 */
exports.up = async function(knex) {
  // Add fulltext indexes for search functionality
  
  // Galleries - search by title and description
  await knex.raw('ALTER TABLE galleries ADD FULLTEXT INDEX idx_galleries_search (title, description)');
  
  // Photos - search by title and description
  await knex.raw('ALTER TABLE photos ADD FULLTEXT INDEX idx_photos_search (title, description)');
  
  // Testimonials - search by name and content
  await knex.raw('ALTER TABLE testimonials ADD FULLTEXT INDEX idx_testimonials_search (name, content)');
  
  // Contacts - search by name, subject, and message
  await knex.raw('ALTER TABLE contacts ADD FULLTEXT INDEX idx_contacts_search (name, subject, message)');
  
  console.log('✅ Fulltext search indexes added');
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function(knex) {
  await knex.raw('ALTER TABLE galleries DROP INDEX idx_galleries_search');
  await knex.raw('ALTER TABLE photos DROP INDEX idx_photos_search');
  await knex.raw('ALTER TABLE testimonials DROP INDEX idx_testimonials_search');
  await knex.raw('ALTER TABLE contacts DROP INDEX idx_contacts_search');
};

