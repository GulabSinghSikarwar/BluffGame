const { SocketEventsEnum } = require('../utils/app.enums');
const Game = require('./game.js');
const TablePile = require('./tablePile.js');
/**
 * Class representing game operations.
 */
class GameOperations {
    /**
  * @param {Game} game - The game object. 
  */
    constructor(game) {
        this.game = game;

    }

    /**
     * Throw cards on the table using the TablePile.
     * @param {string} playerId - The ID of the player throwing the cards.
     * @param {Object} cardsInfo - The cards being thrown by the player.
     * @param {string} cardsInfo.rank
     * @param {Array<string>} cardsInfo.cards
    
     * @returns {Object|null} Event object or null if player is not found.
     * @returns {Object|null} Returns an object containing the event, playerId, and the thrown cards.
     * @returns {string} returns.player -  { id:player.id , name:player.name , cardCount:plaer.hand.length}.
     * @returns {string[]} returns.cards - The  remaining cards of A player.
     * @returns {null} Returns null if the player is not found or an error occurs.
     */
    throwCards(playerId, cardsInfo) {
        try {
            const player = this.game.players.find(p => p.id === playerId);
            console.log("Players id : ", playerId);
            console.log("Players player : ", player);

            if (player) {
                // Remove thrown cards from the player's hand
                console.log("Before Removing cards : ");
                player.hand = player.hand.filter(card => !cardsInfo.cards.includes(card));
                console.log("Card removed from Player Deck");

                // Add the move to the Move array in TablePile, which maintains information 
                // regarding the last move (cards and playerId)
                this.game.tablePile.addMove(playerId, cardsInfo.cards, cardsInfo.rank);
                return {
                    player: {
                        name: player.name,
                        id: player.id,
                        cardCount: player.hand.length
                    }, cards: player.hand
                };
            }
            return null;

        } catch (error) {
            console.error("An error occurred in throwCards:", error);
            return null; // Return null or handle the error accordingly
        }
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
