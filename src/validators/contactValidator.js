const { body, param } = require('express-validator');

/**
 * Create contact validation rules
 */
exports.createContactValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),
    body('phone')
        .optional()
        .trim()
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Please provide a valid phone number'),
    body('subject')
        .notEmpty().withMessage('Subject is required')
        .trim()
        .isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters'),
    body('message')
        .notEmpty().withMessage('Message is required')
        .trim()
        .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
];

/**
 * Update contact validation rules
 */
exports.updateContactValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid contact ID'),
    body('read')
        .optional()
        .isBoolean().withMessage('Read must be a boolean'),
];

/**
 * Contact ID validation
 */
exports.contactIdValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid contact ID'),
];

