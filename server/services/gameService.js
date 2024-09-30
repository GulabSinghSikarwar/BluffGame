const Game = require('../models/game'); // Use require for CommonJS
const Player = require('../models/player'); // Adjusted the import to use CommonJS
const { Card } = require('../models/card'); // Use require for CommonJS

const games = {}; // Using a plain object to store games
const playersRooms = {}

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
    console.log(" Joining a Game : gameid:  ", gameId, " player : ", player);
    playersRooms[player.id] = gameId
    console.log(playersRooms);

    const game = games[gameId];
    if (game) {
        console.log(" game before joining : ", game.players);

        game.addPlayer(player);
        console.log(" game Ater joining : ", game.players);
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
    /**
     * @type {Game}
     */
    const game = games[gameId];
    // console.log("game Service getRoomDetails,    : ", game);
    return game ? game.getRoomDetails() : null;
};

/**
 * @param {string} gameId
 * @returns {Game} 
 */
const getGame = (gameId) => {
    return games[gameId];
}

/**
 * Retrieves player details from a specified game.
 *
 * @param {string} gameId - The unique identifier of the game.
 * @returns {Array|Object|null} - Returns an array of player objects if the game is found,
 *                                returns null if the game does not exist.
 */
const getPlayerDetails = (gameId, socketId) => {
    // Retrieve the game instance from the games object using the gameId
    const game = games[gameId];

    if (game) {
        // Call getPlayerInfo method on the game instance to retrieve player information
        const players = game.getPlayerInfo(socketId);
        return players; // Return the retrieved player information
    }
    return null; // Return null if the game is not found
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

const startGame = (gameId) => {
    /**
     * @type  {Game}
     */
    const game = games[gameId];
    console.log("Start Game : ", game);
    return game ? game.startGame() : false;
};

// Export the functions for use in other modules
// Function to change the turn
const changeTurn = (gameId) => {
    const game = games[gameId];
    if (game) {
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    }
};

// Function to check the winner
const checkWinner = (gameId) => {
    const game = games[gameId];
    if (game) {
        // Implement your winner logic here
        // For example, check if a player has no cards left
        return game.players.find(p => p.cards.length === 0) || null;
    }
    return null;
};

// Function to throw cards
const throwCards = (gameId, playerId, cards) => {
    const game = games[gameId];
    const player = game.players.find(p => p.id === playerId);
    if (player) {
        player.cards = player.cards.filter(card => !cards.includes(card));
    }
};

// Function to check previous player
const checkPreviousPlayer = (gameId, currentPlayerId) => {
    const game = games[gameId];
    const currentPlayerIndex = game.players.findIndex(p => p.id === currentPlayerId);
    const previousPlayerIndex = (currentPlayerIndex - 1 + game.players.length) % game.players.length;
    return game.players[previousPlayerIndex];
};

// Function to notify the result
const notifyResult = (gameId, message) => {
    // Implement logic for notifying the result
};
const skipAction = (gameId, playerId) => {
    const game = games[gameId];
    const player = game.players.find(p => p.id === playerId);
    if (player) {
        player.skipTurn = true; // Mark the player as having skipped their turn
    }
};

// Function to check if caught bluff
const caughtBluff = (gameId, playerId) => {
    // Implement logic to determine if bluffing was caught
}

const removePlayer = (socketId) => {
    const roomId = playersRooms[socketId];



    if (!roomId) return;
    const game = games[roomId]
    if (!game) {
        console.log('Game Not Found');
        return
    }
    game.removePlayer(socketId)


}

const getRoomId = (socketId) => {
    console.log("socket id : ", socketId);
    console.log("Player Rooms : ", playersRooms);

    const roomId = playersRooms[socketId];
    return roomId ? roomId : null
}

module.exports = {
    createGame,
    joinGame,
    getRoomDetails,
    playerMove,
    startGame,
    caughtBluff,
    skipAction,
    checkPreviousPlayer,
    throwCards,
    checkWinner,
    changeTurn,
    removePlayer,
    getRoomId,
    getPlayerDetails,
    games,
    playersRooms,
    getGame

};
