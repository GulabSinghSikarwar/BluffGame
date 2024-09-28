// game.js
const { Card, createDeck } = require('./card'); // Use require for CommonJS
const Player = require('./player'); // Use require for CommonJS
const Events = require('./events'); // Import the Events enum
const EventHandlers = require('./eventHandlers'); // Import the EventHandlers class

class Game {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.deck = createDeck();
        this.currentPlayerIndex = null; // To be set when the game starts
        this.moves = [];
        this.roundWinners = [];
        this.eventHandlers = new EventHandlers(this); // Create an instance of EventHandlers
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]; // Swap cards
        }
    }

    startGame() {
        if (this.players.length >= 3) {
            this.started = true;
            this.currentPlayerIndex = this.players.findIndex(p => p.hasAceOfSpades()); // Find the player with Ace of Spades
            this.distributeCards();
            return true; // Game successfully started
        }
        return false; // Not enough players
    }

    addPlayer(player) {
        this.players.push(player);
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    distributeCards(cardsPerPlayer = 5) {
        for (let player of this.players) {
            player.cards = this.deck.splice(0, cardsPerPlayer);
        }
        return { event: Events.DISTRIBUTE_CARDS, players: this.players.map(p => p.id) };
    }

    changeTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        return { event: Events.CHANGE_TURN, currentPlayer: this.getCurrentPlayer().id };
    }

    checkWinner() {
        const winner = this.players.find(player => player.cards.length === 0);
        if (winner) {
            return { event: Events.CHECK_WINNER, winner: winner.id };
        }
        return null;
    }

    throwCards(playerId, cards) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.cards = player.cards.filter(card => !cards.includes(card));
            this.moves.push({ playerId, cards });
            return { event: Events.THROW_CARDS, playerId, cards };
        }
        return null;
    }

    skipTurn(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            this.moves.push({ playerId, action: 'skipped' });
            return { event: Events.SKIP_ACTION, playerId };
        }
        return null;
    }

    checkPreviousPlayer(playerId) {
        const previousPlayerIndex = (this.currentPlayerIndex - 1 + this.players.length) % this.players.length;
        const previousPlayer = this.players[previousPlayerIndex];
        return { event: Events.CHECK_PREVIOUS_PLAYER, previousPlayerId: previousPlayer.id, cards: previousPlayer.cards };
    }

    caughtBluff(playerId) {
        return { event: Events.CAUGHT_BLUFF, playerId };
    }

    notifyResult(playerId, result) {
        return { event: Events.NOTIFY_RESULT, playerId, result };
    }

    getRoomDetails() {
        return {
            id: this.id,
            players: this.players.map(player => ({ id: player.id, cards: player.cards })),
            moves: this.moves,
        };
    }
}

// Export the Game class for use in other modules
module.exports = Game;
