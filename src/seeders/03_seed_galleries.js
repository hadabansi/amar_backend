/**
 * Seed sample galleries
 * @param {import('knex').Knex} knex
 */
exports.seed = async function(knex) {
  // Delete existing galleries
  await knex('galleries').del();
  
  // Insert sample galleries
  await knex('galleries').insert([
    {
      title: 'Wedding Photography',
      description: 'Capturing your special day with elegance and emotion. Beautiful moments that last forever.',
      category: 'wedding',
      coverImageUrl: '/images/wedding-cover.jpg',
      featured: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Portrait Sessions',
      description: 'Professional portraits that capture your personality and unique essence.',
      category: 'portrait',
      coverImageUrl: '/images/portrait-cover.jpg',
      featured: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Event Coverage',
      description: 'Comprehensive coverage of your corporate and social events with professional quality.',
      category: 'event',
      coverImageUrl: '/images/event-cover.jpg',
      featured: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Engagement Photos',
      description: 'Beautiful engagement photos to celebrate your love story and journey together.',
      category: 'engagement',
      coverImageUrl: '/images/engagement-cover.jpg',
      featured: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Maternity & Newborn',
      description: 'Precious moments captured with care, celebrating new life and family joy.',
      category: 'maternity',
      coverImageUrl: '/images/maternity-cover.jpg',
      featured: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  console.log('✅ Galleries seeded (5 galleries)');
};

