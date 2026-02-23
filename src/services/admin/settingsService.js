const { Settings } = require('../../models');

/**
 * Get settings
 */
exports.getSettings = async () => {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
        settings = await Settings.create({
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
    }

    return settings;
};

/**
 * Update settings
 */
exports.updateSettings = async (data) => {
    let settings = await Settings.findOne();

    if (!settings) {
        settings = await Settings.create(data);
    } else {
        await settings.update(data);
    }

    return settings;
};
