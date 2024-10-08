// context/GameContext.js
import React, { createContext, useState, useEffect } from 'react';
import { SocketEventsEnum } from '../utils/constants';
import toastService from '../services/ToastService';
import { sortCardsByRank } from '../utils/app.utils';

// Create the GameContext
const GameContext = createContext();

const initialGameState = {
    players: [],
    cards: [],
    turns: null,
    gameStarted: false,
    currentTurnCard: null,
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
    };

    const playerLeft = (data) => {


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

        // cardResponse.myHand.cards.sort()
        sortCardsByRank(cardResponse.myHand.cards);

        players.push({
            id: cardResponse.myHand.id,
            name: cardResponse.myHand.name,
            cardCount: cardResponse.myHand.cards.length,
        })



        setGameState((prevState) => ({
            ...prevState,
            cards: cardResponse.myHand.cards,
            players: players,
            turns: cardResponse.turns
        }));

    };

    const updateCards = (updatedCards) => {
        // Sorting the cards  
        console.log("Updated Cards : ", updatedCards);

        sortCardsByRank(updatedCards);
        setGameState((prevState) => {
            return {
                ...prevState,
                cards: updatedCards
            }
        })
    }

    const updateTurns = (turns) => {

        setGameState((prevState) => {
            let updatedTurns = { ...turns }; // Create a copy of the new turns
            return {
                ...prevState,
                turns: updatedTurns // Correctly set the updated turns
            };
        });
    };


    const updateCardCount = (updatedCardCount) => {

        setGameState((prevState) => {
            const updatedPlayers = prevState.players.map(player =>
                player.id === updatedCardCount?.id
                    ? { ...player, cardCount: updatedCardCount?.cardCount }
                    : player
            );
            return {
                ...prevState,
                players: updatedPlayers
            }

        })

    }


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

    const updateCurrentTurnCard = (currentTurnCard) => {
        setGameState((prevState) => {
            return {
                ...prevState,
                currentTurnCard: currentTurnCard
            }
        })
    }

    const value = {
        gameState,
        joinGame,
        distributeCards,    
        changeTurn,
        startGame,
        joinedNewPlayer,
        playerLeft,
        updateCards,
        updateCardCount,
        updateTurns,
        updateCurrentTurnCard,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Exporting the context and provider
export { GameContext, GameProvider };
