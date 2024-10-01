// src/components/PlayerList.js

import React, { useContext, useEffect, useState } from 'react';
import PlayerDetails from '../PlayerDetail/PlayerDetail';
import { getRandomImage } from '../../../utils/constants';
import './PlayerList.css';
import { GameContext } from '../../../contexts/GameContext';

const players = [
    {
        playerName: 'Player 1',
        cardsLeft: 5,
        playerLogo: getRandomImage(),
    },
    {
        playerName: 'Player 2',
        cardsLeft: 3,
        playerLogo: getRandomImage(),
    },
    {
        playerName: 'Player 3',
        cardsLeft: 2,
        playerLogo: getRandomImage(),
    },
    {
        playerName: 'Player 4',
        cardsLeft: 7,
        playerLogo: getRandomImage(),
    },
];


const PlayerList = () => {
    const gameCtx = useContext(GameContext)
    const { gameState } = useContext(GameContext)
    useEffect(() => {
    }, [gameState])
    return (
        <div className=" p-6 rounded-lg w-full h-full mx-auto max-h-full overflow-y-auto player-list-container">
            {/* Mapping through the players array */}
            {gameCtx.gameState.players.map((player, index) => (
                <PlayerDetails
                    key={player.id}
                    playerName={player.name}
                    cardsLeft={player.cardCount}
                    playerLogo={getRandomImage()}
                />
            ))}
        </div>
    );
};

export default PlayerList;
