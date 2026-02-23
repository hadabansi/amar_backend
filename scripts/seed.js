require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Settings = require('../models/Settings');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Settings.deleteMany({});
    await Gallery.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
    });
    console.log('👤 Created admin user');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

    // Create settings
    const settings = await Settings.create({
      siteName: 'Amar Digital Studio',
      email: 'contact@amardigitalstudio.com',
      phone: '+91 8849058787',
      address: 'Pushkar Dham Main Rd, University Rd, opp. trilok Ramji mandir, Rajkot, Gujarat 360005',
      owners: 'Jayesh Chavda & Akash Chavda',
      socialMedia: {
        instagram: 'https://instagram.com/amardigitalstudio',
        facebook: 'https://facebook.com/amardigitalstudio',
        twitter: 'https://twitter.com/amardigitalstudio',
        pinterest: 'https://pinterest.com/amardigitalstudio',
      },
    });
    console.log('⚙️  Created settings');

    // Create sample galleries
    const galleries = await Gallery.insertMany([
      {
        title: 'Wedding Photography',
        description: 'Capturing your special day with elegance and emotion',
        category: 'wedding',
        coverImage: {
          url: '/images/wedding-cover.jpg',
        },
        featured: true,
      },
      {
        title: 'Portrait Sessions',
        description: 'Professional portraits that capture your personality',
        category: 'portrait',
        coverImage: {
          url: '/images/portrait-cover.jpg',
        },
        featured: true,
      },
      {
        title: 'Event Coverage',
        description: 'Comprehensive coverage of your corporate and social events',
        category: 'event',
        coverImage: {
          url: '/images/event-cover.jpg',
        },
        featured: false,
      },
    ]);
    console.log(`📸 Created ${galleries.length} galleries`);

    // Create sample testimonials
    const testimonials = await Testimonial.insertMany([
      {
        name: 'Sarah Johnson',
        role: 'Bride',
        content: 'The photos from our wedding day are absolutely stunning! They captured every moment perfectly.',
        rating: 5,
        image: {
          url: '/images/testimonial-1.jpg',
        },
        approved: true,
      },
      {
        name: 'Michael Chen',
        role: 'CEO, Tech Corp',
        content: 'Professional, creative, and reliable. Our corporate event photos exceeded expectations.',
        rating: 5,
        image: {
          url: '/images/testimonial-2.jpg',
        },
        approved: true,
      },
      {
        name: 'Emily Rodriguez',
        role: 'Portrait Client',
        content: 'Amazing experience! The photographer made me feel comfortable and the results are incredible.',
        rating: 5,
        image: {
          url: '/images/testimonial-3.jpg',
        },
        approved: true,
      },
    ]);
    console.log(`⭐ Created ${testimonials.length} testimonials`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Summary:');
    console.log(`   - Admin users: 1`);
    console.log(`   - Settings: 1`);
    console.log(`   - Galleries: ${galleries.length}`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log('\n🔐 Admin Login:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

