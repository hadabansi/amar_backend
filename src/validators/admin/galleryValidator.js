const { body, param } = require('express-validator');

/**
 * Create gallery validation rules
 */
exports.createGalleryValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .trim()
        .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isIn(['wedding', 'portrait', 'event', 'commercial', 'engagement', 'maternity'])
        .withMessage('Invalid category'),
    body('coverImageUrl')
        .optional(),
    body('coverImage')
        .optional(),
    body('featured')
        .optional()
        .isBoolean().withMessage('Featured must be a boolean'),
];

/**
 * Update gallery validation rules
 */
exports.updateGalleryValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid gallery ID'),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
    body('category')
        .optional()
        .isIn(['wedding', 'portrait', 'event', 'commercial', 'engagement', 'maternity'])
        .withMessage('Invalid category'),
    body('featured')
        .optional()
        .isBoolean().withMessage('Featured must be a boolean'),
];

/**
 * Gallery ID validation
 */
exports.galleryIdValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid gallery ID'),
];

