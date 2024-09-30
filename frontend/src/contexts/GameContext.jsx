// context/GameContext.js
import React, { createContext, useState, useEffect } from 'react';
import { SocketEventsEnum } from '../utils/constants';
import toastService from '../services/ToastService';

// Create the GameContext
const GameContext = createContext();

const initialGameState = {
    players: [],
    cards: [],
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

    const playerLeft = (data) => {
        console.log("Data : ", data);

        setGameState(prevState => (
            {
                ...prevState,
                players: [...data.players]
            }
        ))
    }

    const distributeCards = (cardResponse) => {
        const players = []
        for (let key in cardResponse.otherPlayers) {
            players.push({ ...cardResponse.otherPlayers[key], id: key })
        }

        cardResponse.myHand.cards.sort()
        
        players.push({
            id: cardResponse.myHand.id,
            name: cardResponse.myHand.name,
            cardCount: cardResponse.myHand.cards.length,
        })

        console.log("Players : ", players);

        setGameState((prevState) => ({
            ...prevState,
            cards: cardResponse.myHand.cards,
            players: players,
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
        if (gameState.players.length >= 1) {
            setGameState((prevState) => ({
                ...prevState,
                currentTurn: 0, // Start with the first player
                gameStarted: true,
            }));
        }
    };

    useEffect(() => {
        if (gameState.players.length >= 1 && !gameState.gameStarted) {
            startGame();
        }
    }, [gameState.players]);

    const value = {
        gameState,
        joinGame,
        distributeCards,
        changeTurn,
        startGame,
        joinedNewPlayer,
        playerLeft
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Exporting the context and provider
export { GameContext, GameProvider };
