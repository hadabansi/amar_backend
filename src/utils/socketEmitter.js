/**
 * Helper functions to emit socket events
 */

/**
 * Emit event to frontend
 */
exports.emitToFrontend = (event, data) => {
    try {
        const { emitToFrontend } = require('../socket');
        emitToFrontend(event, data);
        console.log(`📡 Emitted ${event} to frontend`);
    } catch (err) {
        console.log('Socket.IO not available:', err.message);
    }
};

/**
 * Emit event to admin panel
 */
exports.emitToAdmin = (event, data) => {
    try {
        const { emitToAdmin } = require('../socket');
        emitToAdmin(event, data);
        console.log(`📡 Emitted ${event} to admin`);
    } catch (err) {
        console.log('Socket.IO not available:', err.message);
    }
};

