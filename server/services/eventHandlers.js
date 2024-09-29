// eventHandlers.js
const {SocketEventsEnum} = require('../utils/app.enums');

class EventHandlers {
    constructor(game) {
        this.game = game;
    }

    handleChangeTurn() {
        const result = this.game.changeTurn();
        this.notify(result);
    }

    handleDistributeCards(cardsPerPlayer) {
        const result = this.game.distributeCards(cardsPerPlayer);
        this.notify(result);
    }

    handleThrowCards(playerId, cards) {
        const result = this.game.throwCards(playerId, cards);
        this.notify(result);
    }

    handleSkipAction(playerId) {
        const result = this.game.skipTurn(playerId);
        this.notify(result);
    }

    handleCheckWinner() {
        const result = this.game.checkWinner();
        if (result) {
            this.notify(result);
        }
    }

    handleCheckPreviousPlayer(playerId) {
        const result = this.game.checkPreviousPlayer(playerId);
        this.notify(result);
    }

    handleCaughtBluff(playerId) {
        const result = this.game.caughtBluff(playerId);
        this.notify(result);
    }

    handleNotifyResult(playerId, result) {
        const notification = this.game.notifyResult(playerId, result);
        this.notify(notification);
    }

    notify(event) {
        // Emit or log the event as needed
        console.log('Event:', event);
    }
}

module.exports = EventHandlers;
