const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/admin/authController');
const dashboardController = require('../controllers/admin/dashboardController');
const galleryController = require('../controllers/admin/galleryController');
const photoController = require('../controllers/admin/photoController');
const testimonialController = require('../controllers/admin/testimonialController');
const bookingController = require('../controllers/admin/bookingController');
const contactController = require('../controllers/admin/contactController');
const settingsController = require('../controllers/admin/settingsController');
const categoryController = require('../controllers/admin/categoryController');
const incomeController = require('../controllers/admin/incomeController');
const invoiceController = require('../controllers/admin/invoiceController');
const serviceController = require('../controllers/admin/serviceController');

// Import validators
const { loginValidator } = require('../validators/auth/authValidator');
const { createGalleryValidator, updateGalleryValidator, galleryIdValidator } = require('../validators/admin/galleryValidator');
const { createPhotoValidator, photoIdValidator } = require('../validators/admin/photoValidator');
const { createTestimonialValidator, updateTestimonialValidator, testimonialIdValidator } = require('../validators/admin/testimonialValidator');
const { updateBookingValidator, bookingIdValidator } = require('../validators/bookingValidator');
const { updateContactValidator, contactIdValidator } = require('../validators/contactValidator');
const { validate } = require('../validators/validate');

// Import middleware
const apiAuth = require('../middleware/apiAuth');

// ====================
// AUTH ROUTES (No authentication required)
// ====================
router.post('/login', loginValidator, validate, authController.login);

// ====================
// PROTECTED ROUTES (Authentication required for all below)
// ====================
router.use(apiAuth);

// Auth
router.get('/verify', authController.verifyToken);

// Dashboard
router.get('/dashboard/stats', dashboardController.getDashboardStats);
router.get('/dashboard/activity', dashboardController.getRecentActivity);

// Galleries (multer.any() is global, so no need for upload middleware here)
router.get('/galleries', galleryController.getGalleries);
router.get('/galleries/:id', galleryIdValidator, validate, galleryController.getGallery);
router.post('/galleries', galleryController.createGallery);
router.put('/galleries/:id', galleryController.updateGallery);
router.delete('/galleries/:id', galleryIdValidator, validate, galleryController.deleteGallery);

// Photos (multer.any() is global)
router.get('/photos', photoController.getPhotos);
router.post('/photos', photoController.createPhoto);
router.delete('/photos/:id', photoIdValidator, validate, photoController.deletePhoto);

// Testimonials (multer.any() is global)
router.get('/testimonials', testimonialController.getTestimonials);
router.post('/testimonials', testimonialController.createTestimonial);
router.put('/testimonials/:id', testimonialController.updateTestimonial);
router.put('/testimonials/:id/approve', testimonialIdValidator, validate, testimonialController.approveTestimonial);
router.delete('/testimonials/:id', testimonialIdValidator, validate, testimonialController.deleteTestimonial);

// Bookings
router.get('/bookings/stats', bookingController.getBookingStats);
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:id', bookingIdValidator, validate, bookingController.getBooking);
router.put('/bookings/:id', updateBookingValidator, validate, bookingController.updateBooking);

// Contacts
router.get('/contacts/stats', contactController.getContactStats);
router.get('/contacts', contactController.getContacts);
router.get('/contacts/:id', contactIdValidator, validate, contactController.getContact);
router.put('/contacts/:id', updateContactValidator, validate, contactController.updateContact);
router.put('/contacts/:id/read', contactIdValidator, validate, contactController.markAsRead);

// Settings
router.get('/settings', settingsController.getSettings);
router.put('/settings', settingsController.updateSettings);

// Categories
router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.put('/categories/:id/toggle', categoryController.toggleStatus);
router.delete('/categories/:id', categoryController.deleteCategory);

// Income routes
router.get('/incomes', incomeController.getIncomes);
router.get('/incomes/monthly-summary', incomeController.getMonthlySummary);
router.get('/incomes/yearly-summary', incomeController.getYearlySummary);
router.get('/incomes/:id', incomeController.getIncomeById);
router.post('/incomes', incomeController.createIncome);
router.put('/incomes/:id', incomeController.updateIncome);
router.delete('/incomes/:id', incomeController.deleteIncome);

// Invoice routes
router.get('/invoices', invoiceController.getInvoices);
router.get('/invoices/stats', invoiceController.getInvoiceStats);
router.get('/invoices/number/:number', invoiceController.getInvoiceByNumber);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.post('/invoices', invoiceController.createInvoice);
router.put('/invoices/:id', invoiceController.updateInvoice);
router.put('/invoices/:id/payment', invoiceController.updatePaymentStatus);
router.delete('/invoices/:id', invoiceController.deleteInvoice);

// Service routes
router.get('/services', serviceController.getServices);
router.get('/services/:id', serviceController.getService);
router.post('/services', serviceController.createService);
router.put('/services/:id', serviceController.updateService);
router.patch('/services/:id/toggle', serviceController.toggleStatus);
router.patch('/services/:id/order', serviceController.updateDisplayOrder);
router.delete('/services/:id', serviceController.deleteService);

module.exports = router;

