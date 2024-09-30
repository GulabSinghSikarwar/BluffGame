const { SocketEventsEnum } = require('../utils/app.enums');

class EventHandlers {
    constructor(game, io) {
        this.game = game;
        this.io = io; // Pass socket.io instance for real-time communication
    }

    // Map event handlers to game methods dynamically (optional improvement)
    handleEvent(eventType, ...args) {
        const eventMap = {
            [SocketEventsEnum.CHANGE_TURN]: this.handleChangeTurn,
            [SocketEventsEnum.DISTRIBUTE_CARDS]: this.handleDistributeCards,
            [SocketEventsEnum.THROW_CARDS]: this.handleThrowCards,
            [SocketEventsEnum.SKIP_ACTION]: this.handleSkipAction,
            [SocketEventsEnum.CHECK_WINNER]: this.handleCheckWinner,
            [SocketEventsEnum.CHECK_PREVIOUS_PLAYER]: this.handleCheckPreviousPlayer,
            [SocketEventsEnum.CAUGHT_BLUFF]: this.handleCaughtBluff
        };

        const handler = eventMap[eventType];
        if (handler) {
            return handler.apply(this, args);
        } else {
            console.error(`No handler found for event type: ${eventType}`);
        }
    }

    async handleChangeTurn() {
        try {
            const result = await this.game.changeTurn();
            this.notifyAllPlayers(result);
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleDistributeCards(cardsPerPlayer) {
        try {
            const result = await this.game.distributeCards(cardsPerPlayer);
            this.notifyAllPlayers(result);
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleThrowCards(playerId, cards) {
        try {
            const result = await this.game.throwCards(playerId, cards);
            this.notifyAllPlayers(result);
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleSkipAction(playerId) {
        try {
            const result = await this.game.skipTurn(playerId);
            this.notifyAllPlayers(result);
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleCheckWinner() {
        try {
            const result = await this.game.checkWinner();
            if (result) {
                this.notifyAllPlayers(result);
            }
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleCheckPreviousPlayer(playerId) {
        try {
            const result = await this.game.checkPreviousPlayer(playerId);
            this.notifyAllPlayers(result);
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleCaughtBluff(playerId) {
        try {
            const result = await this.game.caughtBluff(playerId);
            this.notifyAllPlayers(result);
        } catch (err) {
            this.handleError(err);
        }
    }

    async handleNotifyResult(playerId, result) {
        try {
            const notification = await this.game.notifyResult(playerId, result);
            this.notifyPlayer(playerId, notification);
        } catch (err) {
            this.handleError(err);
        }
    }

    // Emit event to all connected players (clients)
    notifyAllPlayers(event) {
        this.io.emit('gameEvent', event);
    }

    // Notify a specific player
    notifyPlayer(playerId, event) {
        this.io.to(playerId).emit('gameEvent', event);
    }

    // Handle errors in the event handling process
    handleError(error) {
        console.error('Error handling game event:', error);
        this.io.emit('errorEvent', { message: 'An error occurred during the game.', error });
    }
}

module.exports = EventHandlers;
