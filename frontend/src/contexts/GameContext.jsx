// context/GameContext.js
import React, { createContext, useState, useEffect } from 'react';
import { SocketEventsEnum } from '../utils/constants';
import toastService from '../services/ToastService';

// Create the GameContext
const GameContext = createContext();

const initialGameState = {
    players: [],
    cards: {},
    currentTurn: null,
    gameStarted: false,
};

// GameProvider component
const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState(initialGameState);

    const joinGame = (gameDetails) => {
        const players = [...gameDetails.players]
        setGameState((prevState) => ({
            ...prevState,
            players: players,
        }));
    };

    const joinedNewPlayer = (player) => {
        setGameState((prevState) => ({
            ...prevState,
            players: [...prevState.players, player],
        }));

        toastService.info(`New Player Joined : ${JSON.stringify(player)}`)
    };

    const distributeCards = (playerId, cards) => {
        setGameState((prevState) => ({
            ...prevState,
            cards: {
                ...prevState.cards,
                [playerId]: cards,
            },
        }));
    };

    const changeTurn = () => {
        setGameState((prevState) => {
            const nextTurn = (prevState.currentTurn + 1) % prevState.players.length;
            return {
                ...prevState,
                currentTurn: nextTurn,
            };
        });
    };

    const startGame = () => {
        if (gameState.players.length >= 3) {
            setGameState((prevState) => ({
                ...prevState,
                currentTurn: 0, // Start with the first player
                gameStarted: true,
            }));
        }
    };

    useEffect(() => {
        if (gameState.players.length >= 3 && !gameState.gameStarted) {
            startGame();
        }
    }, [gameState.players]);

    const value = {
        gameState,
        joinGame,
        distributeCards,
        changeTurn,
        startGame,
        joinedNewPlayer
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Exporting the context and provider
export { GameContext, GameProvider };
