const { Gallery, Photo, Testimonial, Booking, Contact } = require('../../models');

/**
 * Get dashboard statistics
 */
exports.getDashboardStats = async () => {
    const [
        totalGalleries,
        totalPhotos,
        totalTestimonials,
        approvedTestimonials,
        pendingTestimonials,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        totalContacts,
        unreadContacts,
    ] = await Promise.all([
        Gallery.count({ where: { isDeleted: false } }),
        Photo.count({ where: { isDeleted: false } }),
        Testimonial.count({ where: { isDeleted: false } }),
        Testimonial.count({ where: { approved: true, isDeleted: false } }),
        Testimonial.count({ where: { approved: false, isDeleted: false } }),
        Booking.count({ where: { isDeleted: false } }),
        Booking.count({ where: { status: 'pending', isDeleted: false } }),
        Booking.count({ where: { status: 'confirmed', isDeleted: false } }),
        Booking.count({ where: { status: 'completed', isDeleted: false } }),
        Contact.count({ where: { isDeleted: false } }),
        Contact.count({ where: { read: false, isDeleted: false } }),
    ]);

    return {
        galleries: totalGalleries,
        photos: totalPhotos,
        testimonials: {
            total: totalTestimonials,
            approved: approvedTestimonials,
            pending: pendingTestimonials,
        },
        bookings: {
            total: totalBookings,
            pending: pendingBookings,
            confirmed: confirmedBookings,
            completed: completedBookings,
        },
        contacts: {
            total: totalContacts,
            unread: unreadContacts,
        },
    };
};

/**
 * Get recent activity
 */
exports.getRecentActivity = async (limit = 10) => {
    const [recentBookings, recentContacts, recentTestimonials] = await Promise.all([
        Booking.findAll({
            where: { isDeleted: false },
            order: [['createdAt', 'DESC']],
            limit: 5,
        }),
        Contact.findAll({
            where: { isDeleted: false },
            order: [['createdAt', 'DESC']],
            limit: 5,
        }),
        Testimonial.findAll({
            where: { isDeleted: false },
            order: [['createdAt', 'DESC']],
            limit: 5,
        }),
    ]);

    // Combine and sort by date
    const activity = [
        ...recentBookings.map(b => ({ type: 'booking', data: b.toJSON() })),
        ...recentContacts.map(c => ({ type: 'contact', data: c.toJSON() })),
        ...recentTestimonials.map(t => ({ type: 'testimonial', data: t.toJSON() })),
    ]
        .sort((a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt))
        .slice(0, limit);

    return activity;
};
