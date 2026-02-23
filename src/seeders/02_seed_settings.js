/**
 * Seed settings
 * @param {import('knex').Knex} knex
 */
exports.seed = async function(knex) {
  // Delete existing settings
  await knex('settings').del();
  
  // Insert default settings
  await knex('settings').insert([
    {
      siteName: 'Amar Digital Studio',
      email: 'contact@amardigitalstudio.com',
      phone: '+91 8849058787',
      address: 'Pushkar Dham Main Rd, University Rd, opp. trilok Ramji mandir, Rajkot, Gujarat 360005',
      owners: 'Jayesh Chavda & Akash Chavda',
      socialMedia: JSON.stringify({
        instagram: 'https://instagram.com/amardigitalstudio',
        facebook: 'https://facebook.com/amardigitalstudio',
        twitter: 'https://twitter.com/amardigitalstudio',
        pinterest: 'https://pinterest.com/amardigitalstudio',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  console.log('✅ Settings seeded');
};

