const { SocketEventsEnum } = require('../../utils/app.enums')
const gameService = require('../../services/gameService')
const Game = require('../../models/game')
/**
 * Sets up game state-related socket event listeners.
 * @param {Socket} socket - The socket instance for the connection.
 */
const handleGameStateEvents = (socket, io) => {

    socket.on(SocketEventsEnum.START_GAME, () => {
        const gameId = gameService.getRoomId(socket.id);
        const gameStarted = gameService.startGame(gameId);
        console.log("Game Starting  ................");
        console.log("Game Started ", gameStarted);

        if (gameStarted) {
            console.log("Game Started  ................");
            /**
             * @type  {Game}
             */
            const game = gameService.getGame(gameId);

            console.log("Game Distribution");

            // Create a single object for all players' card counts with player IDs as keys
            const allPlayerCardCount = game.players.reduce((acc, player) => {

                acc[player.id] = { name: player.name, cardCount: player.hand.length };
                return acc;
            }, {}); // Initialize with an empty object

            // Notify each player about their hand and the number of cards others have
            game.players.forEach(player => {
                console.log("Socket id : ", player.id);
                const cardCount = { ...allPlayerCardCount }; // Shallow copy works for simple objects

                console.log("Before deleting:", cardCount);

                // Delete the current player's entry from the card count object
                delete cardCount[player.id];
                console.log("After deleting:", cardCount);

                const playerData = {
                    myHand: { id: player.id, cards: player.hand, name: player.name }, // The cards for this specific player
                    otherPlayers: cardCount, // Info about other players (card count)
                    turns: {
                        currentTurn: game.players[game.currentPlayerIndex],
                        nextTurn: game.players[game.nextTurn()],
                    }

                };

                // Emit to each player individually
                io.to(player.id).emit(SocketEventsEnum.DISTRIBUTE_CARDS, playerData); // Notify each
            });
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
