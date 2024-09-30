// const suits = ['♠', '♥', '♦', '♣'];
const suits = ['S', 'H', 'D', 'C'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Function to create a full deck of cards
export const createDeck = () => {
  const suits = ['S', 'H', 'C', 'D'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];

  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({ rank, suit });
    });
  });
  shuffle(deck)

  return deck;
};

// Shuffle the deck
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
