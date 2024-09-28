// src/utils/gameLogic.js

export const createDeck = () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];

    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank });
        });
    });

    return deck.sort(() => Math.random() - 0.5);
};

export const mockPlayers = ['Alice', 'Bob', 'Charlie', 'Dana']; // Mock players
