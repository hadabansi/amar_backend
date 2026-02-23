const express = require('express');
const router = express.Router();

// Import controllers
const publicController = require('../controllers/api/publicController');
const authController = require('../controllers/admin/authController');

// Import validators
const { loginValidator } = require('../validators/auth/authValidator');
const { createTestimonialValidator } = require('../validators/admin/testimonialValidator');
const { createBookingValidator } = require('../validators/bookingValidator');
const { createContactValidator } = require('../validators/contactValidator');
const { validate } = require('../validators/validate');

// ====================
// PUBLIC API ROUTES (No authentication required)
// ====================

// Auth
router.post('/auth/login', loginValidator, validate, authController.login);

// Galleries (Public access)
router.get('/galleries', publicController.getGalleries);
router.get('/galleries/:id', publicController.getGallery);

// Photos (Public access)
router.get('/photos', publicController.getPhotos);
router.get('/photos/:id', publicController.getPhoto);

// Testimonials (Public access)
router.get('/testimonials', publicController.getTestimonials);
router.post('/testimonials', createTestimonialValidator, validate, publicController.createTestimonial);

// Settings (Public access)
router.get('/settings', publicController.getSettings);

// Bookings (Public submissions)
router.post('/bookings', createBookingValidator, validate, publicController.createBooking);

// Contacts (Public submissions)
router.post('/contacts', createContactValidator, validate, publicController.createContact);

// Services (Public access)
router.get('/services', publicController.getServices);

module.exports = router;

