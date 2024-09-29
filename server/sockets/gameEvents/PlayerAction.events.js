const {SocketEventsEnum} = require('../../utils/app.enums').SocketEventsEnum
const gameService = require('../../services/gameService')
/**
 * Sets up player action-related socket event listeners.
 * @param {Socket} socket - The socket instance for the connection.
 */
const handlePlayerActions = (socket) => {

    socket.on(SocketEventsEnum.PLAYER_UPDATE, (playerData) => {
        try {
            console.log('Player update:', playerData);
            // Handle player update logic
        } catch (error) {
            console.error(`Error in PLAYER_UPDATE event: ${error.message}`);
            socket.emit('error', 'Error processing player update');
        }
    });

    socket.on(SocketEventsEnum.PLAY_CARD, (card) => {
        try {
            console.log(`Card played: ${card}`);
            // Handle play card logic
        } catch (error) {
            console.error(`Error in PLAY_CARD event: ${error.message}`);
            socket.emit('error', 'Error playing card');
        }
    });

    socket.on(SocketEventsEnum.BLUFF, (targetPlayerId) => {
        try {
            console.log(`Bluff called on player: ${targetPlayerId}`);
            // Handle bluff action logic
        } catch (error) {
            console.error(`Error in BLUFF event: ${error.message}`);
            socket.emit('error', 'Error processing bluff action');
        }
    });

    socket.on(SocketEventsEnum.ACCEPT_BLUFF, (wasBluffing) => {
        try {
            console.log(`Bluff accepted: ${wasBluffing}`);
            // Handle bluff acceptance logic
        } catch (error) {
            console.error(`Error in ACCEPT_BLUFF event: ${error.message}`);
            socket.emit('error', 'Error processing bluff acceptance');
        }
    });

    socket.on(SocketEventsEnum.DRAW_CARD, (card) => {
        try {
            console.log(`Card drawn: ${card}`);
            // Handle drawing card logic
        } catch (error) {
            console.error(`Error in DRAW_CARD event: ${error.message}`);
            socket.emit('error', 'Error drawing card');
        }
    });

    socket.on(SocketEventsEnum.REVEAL_CARD, (card) => {
        try {
            console.log(`Card revealed: ${card}`);
            // Handle revealing card logic
        } catch (error) {
            console.error(`Error in REVEAL_CARD event: ${error.message}`);
            socket.emit('error', 'Error revealing card');
        }
    });

    socket.on(SocketEventsEnum.CURRENT_PLAYER, (player) => {
        try {
            console.log(`Current player: ${player}`);
            // Handle current player logic
        } catch (error) {
            console.error(`Error in CURRENT_PLAYER event: ${error.message}`);
            socket.emit('error', 'Error processing current player');
        }
    });

    socket.on(SocketEventsEnum.CHANGE_TURN, (gameId) => {
        gameService.changeTurn(gameId);
        socket.emit(gameService.TURN_CHANGED, { message: 'Turn has been changed' });
    });

    socket.on(SocketEventsEnum.THROW_CARDS, ({ gameId, playerId, cards }) => {
        gameService.throwCards(gameId, playerId, cards);
        socket.emit(SocketEventsEnum.CARDS_THROWN, { message: 'Cards have been thrown' });
    });

    socket.on(SocketEventsEnum.CHECK_PREVIOUS_PLAYER, (gameId, currentPlayerId) => {
        const previousPlayer = gameService.checkPreviousPlayer(gameId, currentPlayerId);
        socket.emit(SocketEventsEnum.PREVIOUS_PLAYER_RESULT, { previousPlayer });
    });

    socket.on(SocketEventsEnum.SKIP_ACTION, (gameId, playerId) => {
        skipAction(gameId, playerId);
        socket.emit(SocketEventsEnum.ACTION_SKIPPED, { message: 'Action skipped for player' });
    });
    socket.on(SocketEventsEnum.CAUGHT_BLUFF, (gameId, playerId) => {
        const result = gameService.caughtBluff(gameId, playerId);
        socket.emit(SocketEventsEnum.BLUFF_RESULT, { result });
    });
};

module.exports = { handlePlayerActions };
