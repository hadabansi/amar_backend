const publicService = require('../../services/user/publicService');
const constants = require('../../constant');

/**
 * Get public galleries
 * @route GET /public/api/v1/galleries
 * @access Public
 */
exports.getGalleries = async (req, res, next) => {
    try {
        const galleries = await publicService.getPublicGalleries(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.GALLERIES_FETCHED_SUCCESS,
            galleries
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get single public gallery
 * @route GET /public/api/v1/galleries/:id
 * @access Public
 */
exports.getGallery = async (req, res, next) => {
    try {
        const gallery = await publicService.getPublicGallery(req.params.id);
        
        if (!gallery) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.GALLERY_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.GALLERY_FETCHED_SUCCESS,
            gallery
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get public photos
 * @route GET /public/api/v1/photos
 * @access Public
 */
exports.getPhotos = async (req, res, next) => {
    try {
        const photos = await publicService.getPublicPhotos(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.PHOTOS_FETCHED_SUCCESS,
            photos
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get single public photo
 * @route GET /public/api/v1/photos/:id
 * @access Public
 */
exports.getPhoto = async (req, res, next) => {
    try {
        const photo = await publicService.getPublicPhoto(req.params.id);
        
        if (!photo) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.PHOTO_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.PHOTO_FETCHED_SUCCESS,
            photo
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get approved testimonials
 * @route GET /public/api/v1/testimonials
 * @access Public
 */
exports.getTestimonials = async (req, res, next) => {
    try {
        const testimonials = await publicService.getApprovedTestimonials();
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.TESTIMONIALS_FETCHED_SUCCESS,
            testimonials
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Submit testimonial
 * @route POST /public/api/v1/testimonials
 * @access Public
 */
exports.createTestimonial = async (req, res, next) => {
    try {
        const testimonial = await publicService.createTestimonial(req.body);
        
        return generateResponse(
            req,
            res,
            StatusCodes.CREATED,
            true,
            constants.apiResponse.TESTIMONIAL_CREATED_SUCCESS,
            testimonial
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get site settings
 * @route GET /public/api/v1/settings
 * @access Public
 */
exports.getSettings = async (req, res, next) => {
    try {
        const settings = await publicService.getSettings();
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SETTINGS_FETCHED_SUCCESS,
            settings
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Create booking
 * @route POST /public/api/v1/bookings
 * @access Public
 */
exports.createBooking = async (req, res, next) => {
    try {
        const booking = await publicService.createBooking(req.body);
        
        // Emit socket event to notify admin panel
        try {
            const { emitToAdmin } = require('../../utils/socketEmitter');
            emitToAdmin('new_booking', booking);
        } catch (err) {
            console.log('Socket.IO not available:', err.message);
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.CREATED,
            true,
            constants.apiResponse.BOOKING_CREATED_SUCCESS,
            booking
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Create contact message
 * @route POST /public/api/v1/contacts
 * @access Public
 */
exports.createContact = async (req, res, next) => {
    try {
        const contact = await publicService.createContact(req.body);
        
        return generateResponse(
            req,
            res,
            StatusCodes.CREATED,
            true,
            constants.apiResponse.CONTACT_MESSAGE_SENT,
            contact
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get active services
 * @route GET /public/api/v1/services
 * @access Public
 */
exports.getServices = async (req, res, next) => {
    try {
        const services = await publicService.getPublicServices();
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SERVICES_FETCHED_SUCCESS,
            services
        );
    } catch (error) {
        next(error);
    }
};

