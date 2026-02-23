const { Server } = require('socket.io');

let io;

/**
 * Initialize Socket.IO server
 */
function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('🔌 Client connected:', socket.id);

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('🔌 Client disconnected:', socket.id);
        });

        // Join room for admin updates
        socket.on('join_admin', () => {
            socket.join('admin');
            console.log('👤 Admin joined room:', socket.id);
        });

        // Join room for frontend updates
        socket.on('join_frontend', () => {
            socket.join('frontend');
            console.log('👤 Frontend client joined room:', socket.id);
        });
    });

    return io;
}

/**
 * Get Socket.IO instance
 */
function getIO() {
    if (!io) {
        throw new Error('Socket.IO not initialized. Call initializeSocket first.');
    }
    return io;
}

/**
 * Emit event to admin panel
 */
function emitToAdmin(event, data) {
    getIO().to('admin').emit(event, data);
    console.log(`📡 Emitted ${event} to admin panel`);
}

/**
 * Emit event to frontend
 */
function emitToFrontend(event, data) {
    getIO().to('frontend').emit(event, data);
    console.log(`📡 Emitted ${event} to frontend`);
}

module.exports = {
    initializeSocket,
    getIO,
    emitToAdmin,
    emitToFrontend,
};

