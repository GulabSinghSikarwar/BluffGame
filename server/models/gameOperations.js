const SocketEventsEnum = require('../utils/app.enums');
const Game = require('./game.js')
/**
 * Class representing game operations.
 */
class GameOperations {
    /**
     * Create game operations.
     * @param {Game} game - The game object.
     */
    constructor(game) {
        this.game = game;

    }

    /**
     * Throw cards on the table using the TablePile.
     * @param {string} playerId - The ID of the player throwing the cards.
     * @param {Array<string>} cards - The cards being thrown by the player.
     * @returns {Object|null} Event object or null if player is not found.
     */
    throwCards(playerId, cards) {
        const player = this.game.players.find(p => p.id === playerId);
        if (player) {
            // Remove thrown cards from the player's hand
            player.cards = player.cards.filter(card => !cards.includes(card));

            // Add the cards to the table pile
            this.game.tablePile.addCards(playerId, cards);

            // Track the move in the game's moves log
            this.game.moves.push({ playerId, cards });

            return { event: SocketEventsEnum.THROW_CARDS, playerId, cards };
        }
        return null;
    }

    /**
     * Skip the turn for a player.
     * @param {string} playerId - The ID of the player skipping their turn.
     * @returns {Object|null} Event object or null if player is not found.
     */
    skipTurn(playerId) {
        const player = this.game.players.find(p => p.id === playerId);
        if (player) {
            this.game.moves.push({ playerId, action: 'skipped' });
            return { event: SocketEventsEnum.SKIP_ACTION, playerId };
        }
        return null;
    }

    /**
     * Check if there's a winner (player has no cards left).
     * @returns {Object|null} Event object if a winner is found, or null otherwise.
     */
    checkWinner() {
        const winner = this.game.players.find(player => player.cards.length === 0);
        if (winner) {
            return { event: SocketEventsEnum.CHECK_WINNER, winner: winner.id };
        }
        return null;
    }

    /**
     * Handle bluff catching and transfer all cards from the table pile to the bluffing player.
     * @param {string} playerId - The ID of the player who is caught bluffing.
     * @returns {Object|null} Event object or null if bluff can't be caught.
     */
    caughtBluff(playerId) {
        const lastMove = this.game.tablePile.getLastMove();

        if (lastMove && lastMove.playerId === playerId) {
            const caughtPlayer = this.game.players.find(p => p.id === playerId);

            if (caughtPlayer) {
                // The caught player takes all the cards from the table pile
                const allCards = this.game.tablePile.takeAllCards();
                caughtPlayer.cards.push(...allCards);

                return {
                    event: SocketEventsEnum.CAUGHT_BLUFF,
                    playerId,
                    cardsTaken: allCards.length
                };
            }
        }

        return null;
    }

    /**
     * Clear the table pile after the round ends.
     * @returns {Object} Event object representing the clearing of the pile.
     */
    clearTablePile() {
        this.game.tablePile.clearPile();
        return { event: SocketEventsEnum.CLEAR_PILE };
    }
}

module.exports = GameOperations;
