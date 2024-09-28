const SocketEventsEnum =require('../../utils/app.enums').SocketEventsEnum

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

    socket.on(SocketEventsEnum.PASS_TURN, () => {
        try {
            console.log('Turn passed.');
            // Handle turn passing logic
        } catch (error) {
            console.error(`Error in PASS_TURN event: ${error.message}`);
            socket.emit('error', 'Error passing turn');
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
};

module.exports = { handlePlayerActions };
