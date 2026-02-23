const http = require('http');
const initializeApp = require('./app');
const { initializeSocket } = require('./src/socket');

const PORT = process.env.PORT || 8001;

// Start the application
initializeApp()
    .then((app) => {
        const server = http.createServer(app);
        
        // Initialize Socket.IO
        initializeSocket(server);
        console.log('⚡ Socket.IO initialized');
        
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}/`);
            console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 API URL: http://localhost:${PORT}`);
            console.log(`⚡ Socket.IO ready for real-time updates`);
            console.log(`✅ Application initialized successfully`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error('❌ Unhandled Promise Rejection:', err);
            server.close(() => process.exit(1));
        });
    })
    .catch((err) => {
        console.error("❌ Failed to start application:", err);
        process.exit(1);
    });
