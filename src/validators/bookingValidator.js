const { body, param } = require('express-validator');

/**
 * Create booking validation rules
 */
exports.createBookingValidator = [
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
    body('service')
        .notEmpty().withMessage('Service is required'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Please provide a valid date'),
    body('time')
        .optional()
        .trim(),
    body('message')
        .optional()
        .trim()
        .isLength({ max: 1000 }).withMessage('Message must not exceed 1000 characters'),
];

/**
 * Update booking validation rules
 */
exports.updateBookingValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid booking ID'),
    body('status')
        .optional()
        .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
        .withMessage('Invalid status'),
];

/**
 * Booking ID validation
 */
exports.bookingIdValidator = [
    param('id')
        .isInt({ min: 1 }).withMessage('Invalid booking ID'),
];

