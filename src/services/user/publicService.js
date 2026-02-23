const { Gallery, Photo, Testimonial, Settings, Booking, Contact, Service } = require('../../models');
const { sendBookingConfirmation, sendContactNotification } = require('../../helpers');

/**
 * Get public galleries (featured or by category)
 */
exports.getPublicGalleries = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.featured !== undefined) {
        where.featured = filters.featured === 'true';
    }
    if (filters.category) {
        where.category = filters.category;
    }

    return await Gallery.findAll({
        where,
        include: [{
            model: Photo,
            as: 'images',
            where: { isDeleted: false },
            required: false,
        }],
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get single public gallery
 */
exports.getPublicGallery = async (id) => {
    return await Gallery.findOne({
        where: { id, isDeleted: false },
        include: [{
            model: Photo,
            as: 'images',
            where: { isDeleted: false },
            required: false,
        }],
    });
};

/**
 * Get public photos (by gallery or all)
 */
exports.getPublicPhotos = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.galleryId) {
        where.galleryId = filters.galleryId;
    }
    if (filters.featured !== undefined) {
        where.featured = filters.featured === 'true';
    }

    return await Photo.findAll({
        where,
        include: [{
            model: Gallery,
            as: 'gallery',
            where: { isDeleted: false },
            required: false,
        }],
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get single public photo
 */
exports.getPublicPhoto = async (id) => {
    return await Photo.findOne({
        where: { id, isDeleted: false },
        include: [{
            model: Gallery,
            as: 'gallery',
            where: { isDeleted: false },
            required: false,
        }],
    });
};

/**
 * Get approved testimonials
 */
exports.getApprovedTestimonials = async () => {
    return await Testimonial.findAll({
        where: { approved: true, isDeleted: false },
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get site settings
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
 * Create booking (public)
 */
exports.createBooking = async (data) => {
    const booking = await Booking.create({
        ...data,
        status: 'pending',
    });

    // Send booking confirmation email
    try {
        await sendBookingConfirmation(booking.toJSON());
    } catch (error) {
        console.error('Failed to send booking confirmation:', error);
    }

    return booking;
};

/**
 * Create contact message (public)
 */
exports.createContact = async (data) => {
    const contact = await Contact.create({
        ...data,
        read: false,
    });

    // Send notification email to admin
    try {
        await sendContactNotification(contact.toJSON());
    } catch (error) {
        console.error('Failed to send contact notification:', error);
    }

    return contact;
};

/**
 * Submit testimonial (public)
 */
exports.createTestimonial = async (data) => {
    const testimonial = await Testimonial.create({
        ...data,
        approved: false, // Requires admin approval
    });

    return testimonial;
};

/**
 * Get active services
 */
exports.getPublicServices = async () => {
    return await Service.findAll({
        where: { isActive: true, isDeleted: false },
        order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
    });
};
