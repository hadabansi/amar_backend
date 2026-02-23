const express = require('express');
const router = express.Router();

// Import controllers
const galleryController = require('../controllers/admin/galleryController');
const photoController = require('../controllers/admin/photoController');
const testimonialController = require('../controllers/admin/testimonialController');
const bookingController = require('../controllers/admin/bookingController');
const contactController = require('../controllers/admin/contactController');
const settingsController = require('../controllers/admin/settingsController');

// Import validators
const { createGalleryValidator, updateGalleryValidator, galleryIdValidator } = require('../validators/admin/galleryValidator');
const { createPhotoValidator, photoIdValidator } = require('../validators/admin/photoValidator');
const { updateTestimonialValidator, testimonialIdValidator } = require('../validators/admin/testimonialValidator');
const { updateBookingValidator, bookingIdValidator } = require('../validators/bookingValidator');
const { updateContactValidator, contactIdValidator } = require('../validators/contactValidator');
const { validate } = require('../validators/validate');

// ====================
// PROTECTED API ROUTES (JWT authentication required)
// ====================

// All routes here require authentication (handled by middleware in app.js)

// Galleries (Admin operations)
router.post('/galleries', createGalleryValidator, validate, galleryController.createGallery);
router.put('/galleries/:id', updateGalleryValidator, validate, galleryController.updateGallery);
router.delete('/galleries/:id', galleryIdValidator, validate, galleryController.deleteGallery);

// Photos (Admin operations)
router.post('/photos', createPhotoValidator, validate, photoController.createPhoto);
router.delete('/photos/:id', photoIdValidator, validate, photoController.deletePhoto);

// Testimonials (Admin operations)
router.put('/testimonials/:id', updateTestimonialValidator, validate, testimonialController.updateTestimonial);
router.delete('/testimonials/:id', testimonialIdValidator, validate, testimonialController.deleteTestimonial);

// Bookings (Admin operations)
router.get('/bookings', bookingController.getBookings);
router.put('/bookings/:id', updateBookingValidator, validate, bookingController.updateBooking);

// Contacts (Admin operations)
router.get('/contacts', contactController.getContacts);
router.put('/contacts/:id', updateContactValidator, validate, contactController.updateContact);

// Settings (Admin operations)
router.put('/settings', settingsController.updateSettings);

module.exports = router;

