import React, { useContext, useState } from 'react';
import { SocketContext } from '../../../contexts/socketContext';
import { GameContext } from '../../../contexts/GameContext';

const BluffGameControls = ({
    throwCardHandeler, selectedCards,
    rankInput
}) => {
    const { checkCards } = useContext(SocketContext);
    const { gameState } = useContext(GameContext)

    // Handle Throw Cards action
    const handleSubmit = () => {
        throwCardHandeler();
    };

    // Handle Check Cards action
    const handleCheck = () => {
        // Emit CHECK_PREVIOUS_PLAYER event in socket context 
        checkCards()
    };

    // Handle Skip Turn action
    const handleSkip = () => {
        console.log('Player skipped the turn');
        // Add logic to skip the player's turn
    };


    return (
        <div className="flex space-x-4">
            {/* Throw Cards Button */}
            <button
                onClick={handleSubmit}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${selectedCards.length === 0 || !rankInput ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={selectedCards.length === 0 || !rankInput}
            >
                Throw Cards
            </button>

            {/* Check Cards Button */}
            <button
                onClick={handleCheck}
                className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${!gameState.turns?.previousTurn?.name ? 'opacity-50 cursor-not-allowed' : ''}`}

            >
                Check Cards
            </button>

            {/* Skip Turn Button */}
            <button
                onClick={handleSkip}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
                Skip Turn
            </button>
        </div>
    );
};

export default BluffGameControls;
