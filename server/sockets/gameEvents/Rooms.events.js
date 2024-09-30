const Player = require('../../models/player')
const { SocketEventsEnum } = require('../../utils/app.enums')
const gameService = require('../../services/gameService')
/**
 * Sets up room-related socket event listeners.
 * @param {Socket} socket - The socket instance for the connection.
 */
const handleRoomEvents = (socket) => {

    socket.on(SocketEventsEnum.JOIN_ROOM, (data) => {
        // console.log(`Player joined room: ${data.room}`);
        const room = data.room;
        // Handle join room logic
        joinRoom(socket, { username: data.name, roomId: room });
    });

    socket.on(SocketEventsEnum.LEAVE_ROOM, (data) => {
        console.log(`Player left room: ${data.room}`);
        // Handle leave room logic
        const room = data.room;
        // Handle join room logic
        leaveRoom(socket, room)
    });
};

const rooms = {};
/**
 * 
 * @param {Socket} socket 
 * @param {string } room 
 */
function joinRoom(socket, { roomId, username }) {
    const playerName = username;
    console.log("Player NAme : ", playerName);

    try {

        // TODO 1:  Check if a game already exists for the room, otherwise create a new game

        let game = gameService.getRoomDetails(roomId);
        console.log("Game : ", game);

        if (!game) {
            game = gameService.createGame(roomId); // Create a new game if it doesn't exist
            console.log(`Game created for room ${roomId}`);
        }

        // Create a new player instance
        const newPlayer = new Player(socket.id, playerName);
        console.log(" Players  in Game Before Joining or in new Game : ", game.players);


        // TODO 2:  Add the new player to the game
        const isPlayerAdded = gameService.joinGame(game.id, newPlayer);
        game = gameService.getRoomDetails(roomId)

        if (!isPlayerAdded) {
            socket.emit(SocketEventsEnum.ERROR, { message: 'Failed to join game.' });
            return;
        }

        // TODO 3: Join the player to the room (Socket.IO room)
        socket.join(roomId);

        // TODO 4: Send the game details (players list) to the newly joined player
        socket.emit(SocketEventsEnum.JOINED_ROOM, {
            message: 'Welcome to the game!',
            gameDetails: {
                roomId: roomId,
                players: game.players, // Send list of current players
                gameId: game.id,
            }
        });

        //TODO 5:  Notify All players in the room (except the current player) that a new player has joined
        socket.to(roomId).emit(SocketEventsEnum.NEW_PLAYER_JOINED, {
            message: `${newPlayer.name} has joined the game.`,
            player: newPlayer,
        });

        console.log(`${newPlayer.name} joined room ${roomId}`);
    } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', { message: 'Error joining room.' });
    }
}
/**
 * 
 * @param {Socket} socket 
 * @param {string } room 
 */
function leaveRoom(socket, room) {
    if (rooms[room]) {
        const userIndex = rooms[room].users.indexOf(socket.id);
        if (userIndex !== -1) {
            rooms[room].users.splice(userIndex, 1);
            socket.leave(room);
            console.log(`Client left room: ${room}`);

            // Notify others in the room
            socket.to(room).emit('message', `A user has left the room: ${room}`);
        } else {
            socket.emit('message', `You are not in room: ${room}`);
        }
    } else {
        socket.emit('message', `Room ${room} does not exist.`);
    }
}


module.exports = { handleRoomEvents }