const { SocketEventsEnum } = require('../../utils/app.enums')
const gameService = require('../../services/gameService')
const Game = require('../../models/game')
const { Socket } = require('socket.io')
const { logger } = require('../../utils/logger')
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
            const turns = {
                currentTurn: game.players[game.currentPlayerIndex],
                nextTurn: game.players[game.nextTurn()]
            }
            console.log(" turn information : ...........", turns);

            game.players.forEach(player => {
                console.log("Socket id : ", player.id);
                const cardCount = { ...allPlayerCardCount }; // Shallow copy works for simple objects

                console.log("Before deleting:", cardCount);

                // Delete the current player's entry from the card count object
                delete cardCount[player.id];



                const playerData = {
                    myHand: { id: player.id, cards: player.hand, name: player.name }, // The cards for this specific player
                    otherPlayers: cardCount, // Info about other players (card count)
                    turns

                };

                // Emit to each player individually
                io.to(player.id).emit(SocketEventsEnum.DISTRIBUTE_CARDS, playerData); // Notify each
            });
        } else {
            socket.emit(SocketEventsEnum.START_GAME_FAILED, 'Not enough players to start the game.');
        }
    });

    socket.on(SocketEventsEnum.THROW_CARDS, (moveData) => {
        try {
            const roomId = gameService.getRoomId(socket.id);
            const game = gameService.getGame(roomId);

            const cardsThrownUpdate = game.throwCards(socket.id, moveData)

            socket.emit(SocketEventsEnum.PLAYER_CARD_UPDATE, {
                cards: cardsThrownUpdate.cards
            })
            // Updating All Users regarding the Card Count Update 
            io.sockets.in(roomId).emit(SocketEventsEnum.CARD_COUNT_UPDATE, {
                player: cardsThrownUpdate.player,
                turns: cardsThrownUpdate.turns
            })
        } catch (error) {
            console.error("An error occurred in Listening to Cards Thrown:", error);

        }

    })
    socket.on(SocketEventsEnum.CHECK_PREVIOUS_PLAYER, () => {
        try {
            const playerId = socket.id;
            const roomId = gameService.playersRooms[playerId];
            let game = gameService.getGame(roomId);
            logger.debug(` roomID  : ${roomId}`)
            logger.debug(` Accusing Player Id : ${playerId}`)
            const player = game.getPlayerInfo(playerId);
            // logger.debug(` Player--------- : ${JSON.stringify(player)}`)


            /**
            * 1. Fist Need to Update Cards in the BE
            * 2. need to change the turn (increment the turn ) , send and current turns to all the players 
            * 3. previous turn will be null
            * 4. Need to Send the Cards to Single Player 
            * 5. Need to Send the Card Count and Message to All Users  
            *  */

            console.log("Player : ", player);

            const checkBluffResult = game.gameOperations.checkBluff(playerId);
            //Step : 1 Add Cards to the Player 
            console.log(" cards to be taken : ....", checkBluffResult.cardsTaken);

            const updatedPlayer = game.addCardToPlayer(checkBluffResult.playerToTakeCards, checkBluffResult.cardsTaken)

            //Step : 2  Turn changed 

            game.changeTurn()
            game = gameService.getGame(roomId);

            //Step : 3  Turn changed
            const currentTurn = game.players[game.currentPlayerIndex];
            const nextTurn = game.players[game.nextTurn()]
            const previousTurn = null

            // Step : 4 Updating the Cards of Player 
            io.to(checkBluffResult.playerToTakeCards).emit(SocketEventsEnum.PLAYER_CARD_UPDATE, {
                cards: updatedPlayer.hand,
            })
            // Updating All  Peoples regarding the Checking Result 
            const turns = {
                currentTurn,
                nextTurn,
                previousTurn
            }
            io.sockets.in(roomId).emit(SocketEventsEnum.CARD_COUNT_UPDATE, {
                player: {
                    name: updatedPlayer.name,
                    id: updatedPlayer.id,
                    cardCount: updatedPlayer.hand.length
                },
                turns,
                message: checkBluffResult.message
            })





        } catch (error) {
            console.error("An error occurred in Checking Previous Player:", error);

        }
    })

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
