const testimonialService = require('../../services/admin/testimonialService');
const constants = require('../../constant');

/**
 * Get all testimonials
 * @route GET /admin/testimonials
 * @access Private
 */
exports.getTestimonials = async (req, res, next) => {
    try {
        const testimonials = await testimonialService.getTestimonials(req.query);
        
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
 * Create testimonial
 * @route POST /admin/testimonials
 * @access Private
 */
exports.createTestimonial = async (req, res, next) => {
    try {
        const testimonial = await testimonialService.createTestimonial(req, res, next);
        
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
 * Update testimonial
 * @route PUT /admin/testimonials/:id
 * @access Private
 */
exports.updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await testimonialService.updateTestimonial(req, res, next, req.params.id);
        
        if (!testimonial) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.TESTIMONIAL_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.TESTIMONIAL_UPDATED_SUCCESS,
            testimonial
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Approve testimonial
 * @route PUT /admin/testimonials/:id/approve
 * @access Private
 */
exports.approveTestimonial = async (req, res, next) => {
    try {
        const testimonial = await testimonialService.approveTestimonial(req.params.id);
        
        if (!testimonial) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.TESTIMONIAL_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.TESTIMONIAL_APPROVED_SUCCESS,
            testimonial
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Delete testimonial
 * @route DELETE /admin/testimonials/:id
 * @access Private
 */
exports.deleteTestimonial = async (req, res, next) => {
    try {
        const result = await testimonialService.deleteTestimonial(req.params.id);
        
        if (!result) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.TESTIMONIAL_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.TESTIMONIAL_DELETED_SUCCESS
        );
    } catch (error) {
        next(error);
    }
};

