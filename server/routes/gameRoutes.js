// routes/playerRouter.js

const express = require('express');
const router = express.Router();
const { createGame, joinGame, getRoomDetails, playerMove } = require('../services/gameService');
const Player = require('../models/player'); // Import the Player class
const {Card} = require('../models/card'); // Import the Card class

// Create a new game
router.post('/', async (req, res) => {
    try {
        const { gameId } = req.body;
        const game = await createGame(gameId);
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ message: 'Error creating game', error });
    }
});

// Join an existing game
router.post('/join', async (req, res) => {
    try {
        const { gameId, playerName } = req.body;
        const player = new Player('', playerName); // Create a new Player instance
        const joinedPlayer = await joinGame(gameId, player);
        res.status(200).json(joinedPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Error joining game', error });
    }
});

// Get room details
router.get('/:gameId', async (req, res) => {
    try {
        const { gameId } = req.params;
        const roomDetails = await getRoomDetails(gameId);
        if (roomDetails) {
            res.status(200).json(roomDetails);
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving room details', error });
    }
});

// Player move
router.post('/move', async (req, res) => {
    try {
        const { gameId, playerId, card } = req.body;
        const success = await playerMove(gameId, playerId, card);
        if (success) {
            res.status(200).json({ message: 'Move successful' });
        } else {
            res.status(400).json({ message: 'Move failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error making move', error });
    }
});

module.exports = router; // Export the router
