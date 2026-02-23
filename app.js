require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const {
    generateResponse,
    sendMail,
    upload_file,
    delete_file,
    sendBookingConfirmation,
    sendContactNotification,
} = require("./src/helpers");
const publicApiRoutesV1 = require('./src/routes/public_api_v1');
const apiRoutesV1 = require('./src/routes/api_v1');
const adminRoutes = require('./src/routes/admin_routes');
const apiMiddleware = require('./src/middleware/apiAuth');
const errorHandler = require('./src/middleware/errorHandler');

// Initialize app
async function initializeApp() {
    try {
        // Set global helpers
        global.StatusCodes = StatusCodes;
        global.generateResponse = generateResponse;
        global.sendMail = sendMail;
        global.upload_file = upload_file;
        global.delete_file = delete_file;
        global.sendBookingConfirmation = sendBookingConfirmation;
        global.sendContactNotification = sendContactNotification;

        // Initialize database connection
        require("./src/config/database");

        const app = express();
        const upload = multer({
            limits: {
                fileSize: 200 * 1024 * 1024, // 200MB limit for high-quality photos and videos
            },
            fileFilter: (req, file, cb) => {
                // Accept images and videos
                const allowedMimeTypes = [
                    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
                    'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo',
                    'video/x-matroska', 'video/webm'
                ];
                
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type. Only images and videos are allowed.'));
                }
            }
        });

        // CORS configuration
        const allowedOrigins = process.env.ALLOWED_ORIGINS 
            ? process.env.ALLOWED_ORIGINS.split(',')
            : ['http://localhost:3000', 'http://localhost:3001','https://k520t9g0-3000.inc1.devtunnels.ms','https://h1dzpkt2-3000.inc1.devtunnels.ms'];

        const corsOptions = {
            origin: function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg = 'The CORS policy does not allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
            credentials: true,
        };

        app.use(cors(corsOptions));

        // Body parsers - increased limits for large media files
        app.use(express.json({ limit: '200mb' }));
        app.use(express.urlencoded({ extended: true, limit: '200mb' }));
        
        // Multer for file uploads (must be after body parsers)
        app.use(upload.any());

        // Health check
        app.get('/health', (req, res) => {
            res.status(200).json({ 
                status: 'OK', 
                message: 'Server is running',
                timestamp: new Date().toISOString(),
            });
        });

        // API routes with authentication
        app.use('/api/v1', apiMiddleware, apiRoutesV1);

        // Public API routes (no authentication required)
        app.use('/public/api/v1', publicApiRoutesV1);

        // Admin routes
        app.use('/admin', adminRoutes);

        // Static files
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

        // Root route
        app.get('/', (req, res) => {
            res.json({
                message: 'Amar Digital Studio API',
                version: '1.0.0',
                endpoints: {
                    auth: '/api/v1/auth',
                    galleries: '/api/v1/galleries',
                    photos: '/api/v1/photos',
                    testimonials: '/api/v1/testimonials',
                    bookings: '/api/v1/bookings',
                    contacts: '/api/v1/contacts',
                    settings: '/api/v1/settings',
                    admin: '/admin',
                    health: '/health',
                },
            });
        });

        // 404 handler
        app.use((req, res) => {
            res.status(404).json({ 
                success: false,
                message: 'Route not found' 
            });
        });

        // Error handling middleware (must be last)
        app.use(errorHandler);

        return app;
    } catch (error) {
        console.error("❌ Error initializing application:", error);
        throw error;
    }
}

module.exports = initializeApp;

