const { body, param } = require('express-validator');

/**
 * Create testimonial validation rules
 */
exports.createTestimonialValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('role')
        .notEmpty().withMessage('Role is required')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters'),
    body('content')
        .notEmpty().withMessage('Content is required')
        .trim()
        .isLength({ min: 10, max: 1000 }).withMessage('Content must be between 10 and 1000 characters'),
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('image')
        .optional(),
    body('approved')
        .optional()
        .isBoolean().withMessage('Approved must be a boolean'),
];

/**
 * Update testimonial validation rules
 */
exports.updateTestimonialValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid testimonial ID'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('role')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters'),
    body('content')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 }).withMessage('Content must be between 10 and 1000 characters'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('approved')
        .optional()
        .isBoolean().withMessage('Approved must be a boolean'),
];

/**
 * Testimonial ID validation
 */
exports.testimonialIdValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid testimonial ID'),
];

