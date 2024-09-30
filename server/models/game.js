// game.js
const { Card, createDeck } = require('./card'); // Use require for CommonJS
const Player = require('./player'); // Use require for CommonJS
const SocketEventsEnum = require('../utils/app.enums'); // Import the SocketEventsEnum enum
const EventHandlers = require('../services/eventHandlers'); // Import the EventHandlers class
const _ = require('lodash'); // For shuffling
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
        // Check if the player already exists in the players array
        const playerExists = this.players.some(existingPlayer => existingPlayer.id === player.id);

        if (!playerExists) {
            this.players.push(player);
            console.log(`${player} has been added to the game.`);
        } else {
            console.log(`${player} is already in the game.`);
        }
    }

    /**
     * 
     * @param {string} playerId 
     */
    removePlayer(player) {
        console.log("player : ", player);

        // Find the index of the player in the players array
        const index = this.players.findIndex(existingPlayer => existingPlayer.id === player);



        if (index !== -1) {
            // Remove the player from the array
            this.players.splice(index, 1);
            console.log(`${player} has been removed from the game.`);
        } else {
            console.log(`${player} was not found in the game.`);
        }


    }



    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    /**
     * Gets player information based on their socket ID.
     * @param {string} socketId - The ID of the player's socket.
     * @returns {Player|null} - The player information or null if not found.
     */
    getPlayerInfo(socketId) {
        console.log("socketid : ",socketId);
        
        const player = this.players.find((player) => {
            return player.id == socketId;
        });

        console.log("Finding Players ____: ", player);
        return player;
    }

    distributeCards() {
        const deck = _.shuffle(createDeck());
        const handSize = Math.floor(deck.length / this.players.length);

        // Assign cards to each player
        this.players.forEach(player => {
            player.hand = deck.splice(0, handSize); // Give each player a portion of the deck
        });

        // Notify each player about their hand and the number of cards others have
        this.players.forEach(player => {
            const otherPlayers = this.players
                .filter(p => p.id !== player.id)
                .map(p => ({ id: p.id, name: p.name, cardCount: p.hand.length })); // Only send card counts of others

            const playerData = {
                myHand: player.hand, // The cards for this specific player
                otherPlayers: otherPlayers, // Info about other players (card count)
            };

            // Emit to each player individually
            player.socket.emit(SocketEventsEnum.CARDS_DISTRIBUTED, playerData);
        });
    }


    changeTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        return { event: SocketEventsEnum.CHANGE_TURN, currentPlayer: this.getCurrentPlayer().id };
    }

    checkWinner() {
        const winner = this.players.find(player => player.cards.length === 0);
        if (winner) {
            return { event: SocketEventsEnum.CHECK_WINNER, winner: winner.id };
        }
        return null;
    }

    throwCards(playerId, cards) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.cards = player.cards.filter(card => !cards.includes(card));
            this.moves.push({ playerId, cards });
            return { event: SocketEventsEnum.THROW_CARDS, playerId, cards };
        }
        return null;
    }

    skipTurn(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            this.moves.push({ playerId, action: 'skipped' });
            return { event: SocketEventsEnum.SKIP_ACTION, playerId };
        }
        return null;
    }

    checkPreviousPlayer(playerId) {
        const previousPlayerIndex = (this.currentPlayerIndex - 1 + this.players.length) % this.players.length;
        const previousPlayer = this.players[previousPlayerIndex];
        return { event: SocketEventsEnum.CHECK_PREVIOUS_PLAYER, previousPlayerId: previousPlayer.id, cards: previousPlayer.cards };
    }

    caughtBluff(playerId) {
        return { event: SocketEventsEnum.CAUGHT_BLUFF, playerId };
    }

    notifyResult(playerId, result) {
        return { event: SocketEventsEnum.NOTIFY_RESULT, playerId, result };
    }

    getRoomDetails() {
        return {
            id: this.id,
            players: this.players.map(player => ({
                id: player.id,
                name: player.name,
                cardCount: player.hand.length // Only show the number of cards, not the actual cards
            })),
            moves: this.moves,
            started: this.started,
        };
    }

}

// Export the Game class for use in other modules
module.exports = Game;
