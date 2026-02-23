/**
 * Seed default categories
 * @param {import('knex').Knex} knex
 */
exports.seed = async function(knex) {
  // Delete existing categories
  await knex('categories').del();
  
  // Insert default categories
  await knex('categories').insert([
    {
      name: 'Wedding',
      slug: 'wedding',
      description: 'Wedding photography & videography',
      icon: '💍',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Portrait',
      slug: 'portrait',
      description: 'Professional portrait sessions',
      icon: '👤',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Event',
      slug: 'event',
      description: 'Corporate and social event photo & video coverage',
      icon: '🎉',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Commercial',
      slug: 'commercial',
      description: 'Product and business photography & videography',
      icon: '🏢',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Engagement',
      slug: 'engagement',
      description: 'Engagement and couple photo & video sessions',
      icon: '💑',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Maternity',
      slug: 'maternity',
      description: 'Maternity and newborn photography',
      icon: '👶',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Videography',
      slug: 'videography',
      description: 'Professional videography and video production',
      icon: '🎥',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  console.log('✅ Categories seeded (7 categories)');
};

