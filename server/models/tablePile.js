const Move = require('./move')
/**
 * Class representing the pile of cards and moves in a game.
 */
class TablePile {
    /**
     * Create a TablePile instance.
     */
    constructor() {
        /** @type {Array<string>} Cards currently on the table */
        this.cards = [];

        /** @type {Array<Move>} History of moves made in the game */
        this.moves = [];

        /** @type {number} Total number of cards thrown into the pile */
        this.cardCount = 0;

        /** @type {string|null} The card type currently in play for the turn (e.g., Ace, King, etc.) */
        this.currentTurnCard = null;
    }

    /**
     * Add a move to the pile.
     * @param {number} playerId - The ID of the player making the move.
     * @param {Array<string>} cards - The cards thrown by the player.
     */
    addMove(playerId, cards) {
        const move = new Move(playerId, cards);  // Create a new Move object
        this.cards.push(...cards);               // Add cards to the pile
        this.cardCount += move.cardCount;        // Track the number of cards thrown
        this.moves.push(move);                   // Store the move

        // Set the current turn card to the last card thrown
        this.setCurrentTurnCard(cards);
    }

    /**
     * Set the current turn card based on the last card thrown.
     * @param {Array<string>} cards - The list of cards thrown in the current move.
     */
    setCurrentTurnCard(cards) {
        if (cards.length > 0) {
            this.currentTurnCard = cards[cards.length - 1]; // Set to the last card in the thrown cards
        } else {
            this.currentTurnCard = null; // Reset if no cards were thrown
        }
    }

    /**
     * Get the card type currently in play.
     * @returns {string|null} The current turn card or null if no card is set.
     */
    getCurrentTurnCard() {
        return this.currentTurnCard;
    }

    /**
     * Get the last move made in the game.
     * @returns {Object|null} The details of the last move, or null if no moves have been made.
     */
    getLastMove() {
        if (this.moves.length === 0) return null;
        return this.moves[this.moves.length - 1].getMoveDetails(); // Return last move details
    }

    /**
     * Get all cards currently in the pile.
     * @returns {Array<string>} The cards currently in the pile.
     */
    getPile() {
        return this.cards;
    }

    /**
     * Get the total number of cards thrown into the pile.
     * @returns {number} The total number of cards thrown.
     */
    getTotalCardsThrown() {
        return this.cardCount;
    }

    /**
     * Clear the pile (e.g., at the end of a round).
     */
    clearPile() {
        this.cards = [];
        this.moves = [];
        this.cardCount = 0;  // Reset the card count
        this.currentTurnCard = null; // Reset the current turn card
    }

    /**
     * Check if the pile is empty.
     * @returns {boolean} True if the pile is empty, false otherwise.
     */
    isEmpty() {
        return this.cards.length === 0;
    }

    /**
     * Return all cards in the pile (e.g., when a bluff is caught or a player wins the round).
     * @returns {Array<string>} The cards that were in the pile.
     */
    takeAllCards() {
        const cardsToTake = [...this.cards];  // Copy the current pile
        this.clearPile();                     // Clear the pile after taking
        return cardsToTake;
    }

    /**
     * Get the history of moves made in the game.
     * @returns {Array<Object>} An array of move details.
     */
    getMoveHistory() {
        return this.moves.map(move => move.getMoveDetails());
    }
}


// Export the Move class
module.exports = TablePile;