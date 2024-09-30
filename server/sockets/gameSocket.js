const { Server } = require('socket.io');
const { createGame, joinGame, playerMove, getRoomDetails } = require('../services/gameService');
const Player = require('../models/player');
const { handleCommunicationEvents } = require('./gameEvents/Communication.events');
const { handleGameStateEvents } = require('./gameEvents/GameStateEvents');
const { handlePlayerActions } = require('./gameEvents/PlayerAction.events');
const { handleRoomEvents } = require('./gameEvents/Rooms.events');
const gameService = require('../services/gameService');
const { SocketEventsEnum } = require('../utils/app.enums');

const initSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle various event listeners
        handleRoomEvents(socket);
        // handlePlayerActions(socket);
        handleGameStateEvents(socket);
         
    });
};

module.exports = { initSocket }; // Export the initSocket function
