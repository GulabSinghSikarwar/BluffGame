const Game = require('../models/game'); // Use require for CommonJS
const Player = require('../models/player'); // Adjusted the import to use CommonJS
const {Card} = require('../models/card'); // Use require for CommonJS

const games = {}; // Using a plain object to store games

/**
 * Create a new game.
 * @param {string} gameId - The ID of the game to create.
 * @returns {Object} The newly created game instance.
 */
const createGame = (gameId) => {
    const newGame = new Game(gameId);
    games[gameId] = newGame;
    return newGame;
};

/**
 * Join an existing game.
 * @param {string} gameId - The ID of the game to join.
 * @param {Player} player - The player to join the game.
 * @returns {Player} The joined player instance.
 * @throws {Error} If the game is not found.
 */
const joinGame = (gameId, player) => {
    const game = games[gameId];
    if (game) {
        game.addPlayer(player);
        return player;
    }
    throw new Error('Game not found');
};

/**
 * Get room details for a specific game.
 * @param {string} gameId - The ID of the game.
 * @returns {Object|null} The room details or null if not found.
 */
const getRoomDetails = (gameId) => {
    const game = games[gameId];
    return game ? game.getRoomDetails() : null;
};

/**
 * Make a player move.
 * @param {string} gameId - The ID of the game.
 * @param {string} playerId - The ID of the player making the move.
 * @param {Card} card - The card that the player is moving.
 * @returns {boolean} True if the move was successful, otherwise false.
 * @throws {Error} If the game is not found.
 */
const playerMove = (gameId, playerId, card) => {
    const game = games[gameId];
    if (game) {
        return game.moveCard(playerId, card);
    }
    throw new Error('Game not found');
};

// Export the functions for use in other modules
module.exports = {
    createGame,
    joinGame,
    getRoomDetails,
    playerMove
};
