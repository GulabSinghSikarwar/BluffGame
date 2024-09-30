const { SocketEventsEnum } = require('../../utils/app.enums')
const gameService = require('../../services/gameService')
/**
 * Sets up game state-related socket event listeners.
 * @param {Socket} socket - The socket instance for the connection.
 */
const handleGameStateEvents = (socket) => {

    socket.on(SocketEventsEnum.START_GAME, (gameId) => {
        const gameStarted = gameService.startGame(gameId);
        if (gameStarted) {
            const roomDetails = gameService.getRoomDetails(gameId);
            socket.to(gameId).emit(Events.GAME_STARTED, roomDetails); // Notify players that the game has started

            const game = gameService.getGame(gameId);
            game.distributeCards(); // Distribute cards to each player individually
        } else {
            socket.emit(SocketEventsEnum.START_GAME_FAILED, 'Not enough players to start the game.');
        }
    });


    socket.on(SocketEventsEnum.RESTART_GAME, () => {
        try {
            console.log('Game restarted.');
            // Handle restart game logic
        } catch (error) {
            console.error(`Error in RESTART_GAME event: ${error.message}`);
            socket.emit('error', 'Error restarting the game');
        }
    });

    socket.on(SocketEventsEnum.END_GAME, () => {
        try {
            console.log('Game ended.');
            // Handle end game logic
        } catch (error) {
            console.error(`Error in END_GAME event: ${error.message}`);
            socket.emit('error', 'Error ending the game');
        }
    });

    socket.on(SocketEventsEnum.ROUND_RESULTS, (results) => {
        try {
            console.log('Round results:', results);
            // Handle round results logic
        } catch (error) {
            console.error(`Error in ROUND_RESULTS event: ${error.message}`);
            socket.emit('error', 'Error processing round results');
        }
    });

    socket.on(SocketEventsEnum.GET_ROOM_DETAILS, (gameId) => {
        const roomDetails = gameService.getRoomDetails(gameId);
        socket.emit(Events.ROOM_DETAILS, roomDetails);
    });
};

module.exports = { handleGameStateEvents };
