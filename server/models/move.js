/**
 * Class representing a move made by a player.
 */
class Move {
    /**
     * Create a move.
     * @param {number} playerId - The ID of the player making the move.
     * @param {Array<string>} cards - The cards thrown by the player.
     */
    constructor(playerId, cards) {
        /** @type {number} ID of the player making the move */
        this.playerId = playerId;

        /** @type {Array<string>} Cards thrown by the player */
        this.cards = cards;

        /** @type {number} Number of cards thrown */
        this.cardCount = cards.length;
    }

    /**
     * Get the details of the move.
     * @returns {Object} An object containing the player ID and the cards thrown.
     */
    getMoveDetails() {
        return {
            playerId: this.playerId,
            cards: this.cards,
            cardCount: this.cardCount,
        };
    }
}


// Export the Move class
module.exports = Move;