// models/card.js

/**
 * Represents a playing card.
 * @class
 */
class Card {
    /**
     * Creates a Card.
     * @param {string} suit - The suit of the card (e.g., 'Hearts', 'Diamonds').
     * @param {string} rank - The rank of the card (e.g., '2', '3', 'K', 'A').
     */
    constructor(suit, rank) {
        this.suit = suit; // e.g., 'Hearts', 'Diamonds'
        this.rank = rank; // e.g., '2', '3', 'K', 'A'
    }
}



// Create a deck of cards
/**
 * Creates a deck of playing cards.
 * @returns {Card[]} - An array of Card objects representing the deck.
 */
 const createDeck = () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            // Create an instance of Card for each combination of suit and rank
            deck.push(new Card(suit, rank));
        }
    }

    // Shuffle the deck
    return deck.sort(() => Math.random() - 0.5);
};

module.exports ={ createDeck ,Card}
