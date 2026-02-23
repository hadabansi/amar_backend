const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * Seed admin user
 * @param {import('knex').Knex} knex
 */
exports.seed = async function(knex) {
  // Delete existing users
  await knex('users').del();
  
  // Hash password
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  // Insert admin user
  await knex('users').insert([
    {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      secretId: uuidv4(),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  console.log('✅ Admin user seeded');
  console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@example.com'}`);
  console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
};

