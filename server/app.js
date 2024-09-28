const express = require('express');
const { Server } = require("socket.io");
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const { initSocket } = require('./sockets/gameSocket');
const { errorHandler } = require('./middleware/errorHandler');

const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors());
app.use(express.json());

/**
 * API Routes for game-related actions.
 * @example
 * GET /api/game
 * POST /api/game/join
 */
app.use('/api/game', gameRoutes);

// Error handling middleware
app.use(errorHandler);

/**
 * Initialize Socket.io for real-time communication.
 * @function
 * @param {Server} io - The Socket.io server instance.
 */
initSocket(io);

/**
 * Starts the server and listens on the specified port.
 * @param {number} PORT - The port number for the server to listen on.
 */
const PORT = process.env.PORT || 3000; // Default to 3000 if no environment variable is set
 

// Export server and io for use in other modules
module.exports = { server, io };
