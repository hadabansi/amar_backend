const bookingService = require('../../services/admin/bookingService');
const constants = require('../../constant');
const { emitToAdmin } = require('../../socket');

/**
 * Get all bookings
 * @route GET /admin/bookings
 * @access Private
 */
exports.getBookings = async (req, res, next) => {
    try {
        const bookings = await bookingService.getBookings(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.BOOKINGS_FETCHED_SUCCESS,
            bookings
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get single booking
 * @route GET /admin/bookings/:id
 * @access Private
 */
exports.getBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        
        if (!booking) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.BOOKING_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.BOOKING_FETCHED_SUCCESS,
            booking
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update booking
 * @route PUT /admin/bookings/:id
 * @access Private
 */
exports.updateBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.updateBooking(req.params.id, req.body);
        
        if (!booking) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.BOOKING_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.BOOKING_UPDATED_SUCCESS,
            booking
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get booking statistics
 * @route GET /admin/bookings/stats
 * @access Private
 */
exports.getBookingStats = async (req, res, next) => {
    try {
        const stats = await bookingService.getBookingStats();
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.DATA_FETCHED_SUCCESSFULLY,
            stats
        );
    } catch (error) {
        next(error);
    }
};

