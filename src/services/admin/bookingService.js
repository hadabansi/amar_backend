const { Booking, Service } = require('../../models');
const { Op } = require('sequelize');
const { sendBookingConfirmation, sendSMS } = require('../../helpers');

/**
 * Get all bookings with filters
 */
exports.getBookings = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.status) {
        where.status = filters.status;
    }

    return await Booking.findAll({
        where,
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get single booking by ID
 */
exports.getBookingById = async (id) => {
    return await Booking.findOne({
        where: { id, isDeleted: false },
    });
};

/**
 * Update booking
 */
exports.updateBooking = async (id, data) => {
    const booking = await Booking.findOne({ where: { id, isDeleted: false } });
    
    if (!booking) {
        return null;
    }

    const oldStatus = booking.status;
    const newStatus = data.status;

    await booking.update(data);
    const updatedBooking = await booking.reload();

    // Send email and SMS when booking is confirmed
    if (oldStatus !== 'confirmed' && newStatus === 'confirmed') {
        try {
            // Get all services for email formatting (including inactive ones for historical bookings)
            const servicesData = await Service.findAll({ 
                where: { 
                    isDeleted: false 
                } 
            });
            console.log('📦 Fetched services from database:', servicesData.length);
            console.log('📋 Booking service IDs:', booking.service);
            
            // Convert Sequelize instances to plain objects
            const services = servicesData.map(s => {
                const json = s.toJSON ? s.toJSON() : s;
                console.log(`   - Service: ${json.title} (ID: ${json.id})`);
                return json;
            });
            
            console.log('📤 Sending email with services:', services.length);
            
            // Send email
            await sendBookingConfirmation(updatedBooking.toJSON(), services);
            console.log(`✅ Confirmation email sent to ${updatedBooking.email}`);
            
            // Send SMS if phone number is provided
            if (updatedBooking.phone) {
                const serviceNames = getServiceNamesForBooking(updatedBooking.service, services);
                const smsMessage = `Hello ${updatedBooking.name}! Your booking for ${serviceNames} on ${new Date(updatedBooking.date).toLocaleDateString()} has been confirmed. We'll contact you soon! - Amar Digital Studio`;
                
                const smsResult = await sendSMS(updatedBooking.phone, smsMessage);
                if (smsResult.success) {
                    console.log(`✅ Confirmation SMS sent to ${updatedBooking.phone}`);
                } else {
                    console.log(`ℹ️ SMS not sent: ${smsResult.message}`);
                }
            }
        } catch (error) {
            console.error('Failed to send booking confirmation notification:', error);
        }
    }

    return updatedBooking;
};

/**
 * Helper function to get service names for a booking
 */
const getServiceNamesForBooking = (serviceData, services = []) => {
    try {
        let serviceIds = serviceData;
        if (typeof serviceData === 'string') {
            serviceIds = JSON.parse(serviceData);
        }
        
        if (!Array.isArray(serviceIds)) {
            serviceIds = [serviceIds];
        }

        const serviceNames = serviceIds.map(id => {
            const service = services.find(s => s.id === parseInt(id) || s.id === id);
            return service ? service.title : `Service ID: ${id}`;
        });
        
        return serviceNames.join(', ');
    } catch {
        return 'Services';
    }
};

/**
 * Update booking status
 */
exports.updateBookingStatus = async (id, status) => {
    const booking = await Booking.findOne({ where: { id, isDeleted: false } });
    
    if (!booking) {
        return null;
    }

    const oldStatus = booking.status;
    
    await booking.update({ status });
    const updatedBooking = await booking.reload();

    // Send email and SMS when booking is confirmed
    if (oldStatus !== 'confirmed' && status === 'confirmed') {
        try {
            // Get all services for email formatting (including inactive ones for historical bookings)
            const servicesData = await Service.findAll({ 
                where: { 
                    isDeleted: false 
                } 
            });
            console.log('📦 Fetched services from database (updateStatus):', servicesData.length);
            
            // Convert Sequelize instances to plain objects
            const services = servicesData.map(s => {
                const json = s.toJSON ? s.toJSON() : s;
                console.log(`   - Service: ${json.title} (ID: ${json.id})`);
                return json;
            });
            
            console.log('📤 Sending email with services (updateStatus):', services.length);
            
            // Send email
            await sendBookingConfirmation(updatedBooking.toJSON(), services);
            console.log(`✅ Confirmation email sent to ${updatedBooking.email}`);
            
            // Send SMS if phone number is provided
            if (updatedBooking.phone) {
                const serviceNames = getServiceNamesForBooking(updatedBooking.service, services);
                const smsMessage = `Hello ${updatedBooking.name}! Your booking for ${serviceNames} on ${new Date(updatedBooking.date).toLocaleDateString()} has been confirmed. We'll contact you soon! - Amar Digital Studio`;
                
                const smsResult = await sendSMS(updatedBooking.phone, smsMessage);
                if (smsResult.success) {
                    console.log(`✅ Confirmation SMS sent to ${updatedBooking.phone}`);
                } else {
                    console.log(`ℹ️ SMS not sent: ${smsResult.message}`);
                }
            }
        } catch (error) {
            console.error('Failed to send booking confirmation notification:', error);
        }
    }

    return updatedBooking;
};

/**
 * Delete booking
 */
exports.deleteBooking = async (id) => {
    const booking = await Booking.findOne({ where: { id, isDeleted: false } });
    
    if (!booking) {
        return null;
    }

    await booking.update({ isDeleted: true });
    return true;
};

/**
 * Get booking statistics
 */
exports.getBookingStats = async () => {
    const total = await Booking.count({ where: { isDeleted: false } });
    const pending = await Booking.count({ where: { status: 'pending', isDeleted: false } });
    const confirmed = await Booking.count({ where: { status: 'confirmed', isDeleted: false } });
    const completed = await Booking.count({ where: { status: 'completed', isDeleted: false } });
    const cancelled = await Booking.count({ where: { status: 'cancelled', isDeleted: false } });

    return {
        total,
        pending,
        confirmed,
        completed,
        cancelled,
    };
};
