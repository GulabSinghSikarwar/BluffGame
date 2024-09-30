
const {Card} = require('./card');

/**
 * Represents a player in the game.
 * @class
 */
class Player {
    /**
     * Creates a Player.
     * @param {string} id - The unique identifier for the player.
     * @param {string} name - The name of the player.
     * @param {Card[]} [hand=[]] - An optional array of Card objects.
     */
    constructor(id, name, hand = []) {
        this.id = id;          // string
        this.name = name;      // string
        this.hand = hand;
              // Array of Card objects

        // Using JSDoc to communicate expectations, no runtime validation
    }

    /**
     * Adds a card to the player's hand.
     * @param {Card} card - The card to add.
     */
    addCard(card) {
        this.hand.push(card);
    }

    /**
     * Removes a card from the player's hand.
     * @param {Card} card - The card to remove.
     */
    removeCard(card) {
        const index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);
        } else {
            throw new Error("Card not found in hand");
        }
    }
    // hasAceOfSpades() {
    //     return this.cards.some(card => card.rank === 'Ace' && card.suit === 'Spades');
    // }

    hasAceOfSpades() {
        return this.hand.some(card => card.rank === 'A' && card.suit === 'Spades');
    }
    

    sendCardCount(otherPlayerCount) {
        // Logic to send the count of cards to the player (using socket)
        // Example: socket.emit(Events.CARD_COUNT, { count: this.cards.length });
    }
}

module.exports = Player;
