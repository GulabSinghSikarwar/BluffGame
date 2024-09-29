const { Server } = require('socket.io');
const { createGame, joinGame, playerMove, getRoomDetails } = require('../services/gameService');
const Player = require('../models/player');
const { handleCommunicationEvents } = require('./gameEvents/Communication.events');
const { handleGameStateEvents } = require('./gameEvents/GameStateEvents');
const { handlePlayerActions } = require('./gameEvents/PlayerAction.events');
const { handleRoomEvents } = require('./gameEvents/Rooms.events');
const gameService = require('../services/gameService')

const initSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle various event listeners
        handleRoomEvents(socket);
        // handlePlayerActions(socket);
        // handleGameStateEvents(socket);
        // handleCommunicationEvents(socket);

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log(`User disconnected: ${socket.id}. Reason: ${reason}`);

            const rooms = socket.rooms; // This includes all rooms the socket was in
            console.log("Rooms : ", rooms);
            console.log("Socket id :  : ",socket.id );
            gameService.removePlayer(socket.id)

            // Clean up any resources or perform actions on disconnect, if necessary
            // e.g., Remove the player from rooms, update game state, etc.
        });

        // // Optional: Handle other disconnection scenarios, like timeouts
        // socket.on('disconnecting', () => {
        //     console.log(`User is disconnecting: ${socket.id}`);
        //     // Handle logic if needed before the user fully disconnects
        // });
    });
};

module.exports = { initSocket }; // Export the initSocket function
