// src/components/PlayerList.js

import React from 'react';
import PlayerDetails from '../PlayerDetail/PlayerDetail';
import { getRandomImage } from '../../../utils/constants';
import './PlayerList.css';

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
    return (
        <div className="bg-white p-6 rounded-lg w-full h-full mx-auto max-h-full overflow-y-auto player-list-container">
            {/* Mapping through the players array */}
            {players.map((player, index) => (
                <PlayerDetails
                    key={index}
                    playerName={player.playerName}
                    cardsLeft={player.cardsLeft}
                    playerLogo={player.playerLogo}
                />
            ))}
        </div>
    );
};

export default PlayerList;
