const { SocketEventsEnum } = require('../utils/app.enums');
const { logger } = require('../utils/logger.js');
const Game = require('./game.js');
const Move = require('./move.js');
const Player = require('./player.js');
const RoundWinner = require('./roundWinner.js');
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
     * @returns {Object|null}  Object ( containing turns) 
     */
    skipTurn() {
        // const player = this.game.players.find(p => p.id === playerId);
        // if (player) {
        //     this.game.moves.push({ playerId, action: 'skipped' });
        //     return { event: SocketEventsEnum.SKIP_ACTION, playerId };
        // }
        try {
            /**
             * @type  {Player} player

             */
            const currentPlayer = this.game.players[this.game.currentPlayerIndex];
            const message = `Player ${currentPlayer.name} Have Skip the turn`
            this.game.changeTurn();
            const c = this.game[this.game]
            const turns = {
                currentTurn: this.game.players[this.game.currentPlayerIndex],
                nextTurn: this.game.players[this.game.nextTurn()],
                previousTurn: currentPlayer
            }
            return {
                turns, message
            }
        } catch (error) {
            console.log(`In Game Operation ,Skip Turn, some eror occured :`, error);

        }
    }

    /**
     * Check if there's a winner (player has no cards left).
     * @returns {Object|null} Event object if a winner is found, or null otherwise.
     */
    checkWinner() {
        try {
            /**
         * For Deciding Winner we will check following things and if any player Fullfills all Conditions will be added winner list 
         */
            const previousPlayerIndex = this.game.previousPlayer();
            const previousPlayer = this.game.players[previousPlayerIndex];

            //1. Player Should Not Have have any Cards 
            const noCardLeft = previousPlayer.hand.length == 0
            //2. Player Should Not Have any cards in Draw pile at the top 
            /**
             * @type {Move} -Move that is stored in the Table Pile
             */
            const lastMove = this.game.tablePile.getLastMove()
            const havePendingMove = true
            if (lastMove) {
                havePendingMove = lastMove.playerId == previousPlayer.id
                const haveWon = noCardLeft && !havePendingMove;

                //3.if Player Won the Round then add him in to round winners and remove
                // from the Players list
                if (haveWon) {
                    const winner = new RoundWinner(
                        this.game.roundWinners.length + 1,
                        previousPlayer.name,
                        previousPlayer.id
                    );

                    this.game.roundWinners.push(winner)
                }
            }



        } catch (error) {
            console.log("Some Error Occured while checking Winner in Game Operation");


        }
    }


    /**
    * Check if the last move was a bluff.
    * This compares the declared card rank with the actual cards thrown by the player.
    * @param {number} accusingPlayerId - The ID of the player accusing the bluff.
    * @returns {Object} Result of the bluff check with details about who takes the cards.
    */
    checkBluff(accusingPlayerId) {
        try {
            const player = this.getPlayerFromId(accusingPlayerId);
            const debugLog1 = `
            In Game Operation : 
            accusingPlayerId : ${accusingPlayerId}
            player : ${JSON.stringify(player)}
            `
            logger.debug(debugLog1)
            console.log(debugLog1);

            if (!player) {
                throw new Error("Accusing Player not found");
            }
            const result = this.game.tablePile.checkBluff(player, this.game.players);
            return result;

        } catch (error) {
            console.log("Error While Checking Bluff in Game operations : ", error);
        }
    }
    /**
     * Clear the table pile after the round ends.
     * @returns {Object} Event object representing the clearing of the pile.
     */
    clearTablePile() {
        this.game.tablePile.clearPile();
        return { event: SocketEventsEnum.CLEAR_PILE };
    }
    /**
     * @param {string} playerId 
     * @return {Player | undefined } -returns the player With having giving playerId  
     */
    getPlayerFromId(playerId) {
        const player = this.game.players.find((player) => player.id == playerId);
        return player;
    }

    checkTurn() {
        try {
            const allSkipped = this.game.players.every(p => p.hasSkipped);

            if (allSkipped) {
                // If all players skipped, remove cards from the table
                console.log("All players skipped. Removing cards from the table.");
                this.game.tablePile.clearPile()
                // this.game.changeTurn();
                // TODO :we need to emit the event that table pile is cleared 
            } else {
                // Proceed to the next player's turn
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            }
        } catch (error) {

        }
    }
}

module.exports = GameOperations;
