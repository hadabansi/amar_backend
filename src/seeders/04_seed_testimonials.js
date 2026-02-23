/**
 * Seed sample testimonials
 * @param {import('knex').Knex} knex
 */
exports.seed = async function(knex) {
  // Delete existing testimonials
  await knex('testimonials').del();
  
  // Insert sample testimonials
  await knex('testimonials').insert([
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      content: 'The photos from our wedding day are absolutely stunning! They captured every moment perfectly. Professional, creative, and so easy to work with.',
      rating: 5,
      imageUrl: '/images/testimonial-1.jpg',
      approved: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Michael Chen',
      role: 'CEO, Tech Corp',
      content: 'Professional, creative, and reliable. Our corporate event photos exceeded expectations. Highly recommend for any business event.',
      rating: 5,
      imageUrl: '/images/testimonial-2.jpg',
      approved: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Emily Rodriguez',
      role: 'Portrait Client',
      content: 'Amazing experience! The photographer made me feel comfortable and the results are incredible. The photos truly capture my personality.',
      rating: 5,
      imageUrl: '/images/testimonial-3.jpg',
      approved: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Raj Patel',
      role: 'Engagement Client',
      content: 'Beautiful engagement photos! They captured our love story perfectly. The locations and poses were creative and romantic.',
      rating: 5,
      approved: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Priya Sharma',
      role: 'Maternity Client',
      content: 'Such a wonderful experience during my maternity shoot. They were patient, professional, and the photos are treasured memories.',
      rating: 5,
      approved: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  console.log('✅ Testimonials seeded (5 testimonials)');
};

