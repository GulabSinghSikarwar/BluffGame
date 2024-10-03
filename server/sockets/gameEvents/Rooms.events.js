// roomEvents.js
const Player = require('../../models/player');
const { SocketEventsEnum } = require('../../utils/app.enums');
const gameService = require('../../services/gameService');
const { Socket } = require('socket.io')
/**
 * Sets up room-related socket event listeners.
 * @param {Socket} socket - The socket instance for the connection.
 */
const handleRoomEvents = (socket) => {
    socket.on(SocketEventsEnum.JOIN_ROOM, (data) => {
        const room = data.room;
        // Handle join room logic
        joinRoom(socket, { username: data.name, roomId: room });
    });

    socket.on(SocketEventsEnum.LEAVE_ROOM, (data) => {
        const room = data.room;
        console.log("room : ", room.length);

        console.log("Listened : Left : ..............", room);

        // Handle leave room logic
        handlePlayerLeave(socket, room, true);
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}. Reason: ${reason}`);
        const roomId = gameService.getRoomId(socket.id);
        if (roomId) {
            handlePlayerLeave(socket, roomId, false);
        }
    });
};

const rooms = {};

/**
 * Handle a player leaving a room (either by choice or disconnecting).
 * @param {Socket} socket 
 * @param {string} room 
 * @param {boolean} isLeaving - Indicates if the leave was intentional.
 */
function handlePlayerLeave(socket, room, isLeaving) {
    const player = gameService.getPlayerDetails(room, socket.id);

    if (player) {
        // Remove player from the game
        gameService.removePlayer(socket.id);

        // Notify other players in the room
        socket.to(room).emit(SocketEventsEnum.PLAYER_LEFT, {
            message: `${player.name} has left the game.`,
            player: player,
            players: gameService.getRoomDetails(room).players
        });

        // Leave the room
        socket.leave(room);
        console.log(`${player.name} left room: ${room}`);
    } else {
        socket.emit(SocketEventsEnum.ERROR, { message: `You are not in the room: ${room}` });
    }
}

/**
 * 
 * @param {Socket} socket 
 * @param {string} roomId 
 * @param {string} username 
 */
function joinRoom(socket, { roomId, username }) {
    const playerName = username;
    console.log("Player Name: ", playerName);

    try {
        let game = gameService.getRoomDetails(roomId);

        if (!game) {
            game = gameService.createGame(roomId); // Create a new game if it doesn't exist
            console.log(`Game created for room ${roomId}`);
        }
        if (game && game.started) {
            socket.emit(SocketEventsEnum.JOINED_ROOM, {
                message: 'Game Already Started , cannot join the Game !!',
                joining: false,
            });
            return 
        }


        // Create a new player instance
        const newPlayer = new Player(socket.id, playerName);
        console.log("Players in Game Before Joining or in new Game: ", game.players);

        const isPlayerAdded = gameService.joinGame(game.id, newPlayer);
        game = gameService.getRoomDetails(roomId);

        if (!isPlayerAdded) {
            socket.emit(SocketEventsEnum.ERROR, { message: 'Failed to join game.' });
            return;
        }

        // Join the player to the room (Socket.IO room)
        socket.join(roomId);

        // Send the game details to the newly joined player
        socket.emit(SocketEventsEnum.JOINED_ROOM, {
            message: 'Welcome to the game!',
            joining: true,
            gameDetails: {
                roomId: roomId,
                players: game.players, // Send list of current players
                gameId: game.id,
                username
            }
        });

        // Notify all players in the room that a new player has joined
        socket.to(roomId).emit(SocketEventsEnum.NEW_PLAYER_JOINED, {
            message: `${newPlayer.name} has joined the game.`,
            player: newPlayer,
        });

        console.log(`${newPlayer.name} joined room ${roomId}`);
    } catch (error) {
        console.error('Error joining room:', error);
        socket.emit(SocketEventsEnum.ERROR, { message: 'Error joining room.' });
    }
}

module.exports = { handleRoomEvents };
