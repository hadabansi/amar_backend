const { body, param } = require('express-validator');

/**
 * Create photo validation rules
 */
exports.createPhotoValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
    body('imageUrl')
        .notEmpty().withMessage('Image is required'),
    body('galleryId')
        .notEmpty().withMessage('Gallery ID is required')
        .isInt({ min: 1 }).withMessage('Invalid gallery ID'),
];

/**
 * Photo ID validation
 */
exports.photoIdValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid photo ID'),
];

