import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../contexts/socketContext';
import { GameContext } from '../../../contexts/GameContext';
import { MainContext } from '../../../contexts/mainContext';
import { getRankAndSuit } from '../../../utils/app.utils';
import { SocketEventsEnum } from '../../../utils/constants';

const BluffGameControls = ({
    throwCardHandeler, selectedCards,
    rankInput
}) => {
    const { checkCards, socket } = useContext(SocketContext);
    const { gameState } = useContext(GameContext)
    const { name } = useContext(MainContext)
    const [isSkipAllowed, setIsSkipAllowed] = useState(false);

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
        socket.emit(SocketEventsEnum.SKIP_ACTION);
    };

    const doesCardPresent = (currentTurnCard) => {
        const index = gameState.cards.findIndex((card) => {
            console.log("Card: ", card, " Current card : ", currentTurnCard);

            return card === getRankAndSuit(card).rank;
        })
        console.log("Card index while finding : ", index);

        if (index == -1) {
            return false;
        }
        return true;
    }
    const updateIsSkipAllowed = () => {
        const turns = gameState.turns
        const isOurTurn = turns && turns.currentTurn && turns.currentTurn.name == name;
        const doesUserHaveCard = doesCardPresent(gameState.currentTurnCard);
        console.log('Turns : ', turns);
        console.log('isOur Turn : ', isOurTurn);
        console.log('does User Have Card : ', doesUserHaveCard);

        const update = isOurTurn && !doesUserHaveCard
        console.log("update : ", update);

        setIsSkipAllowed(update);
    }
    useEffect(() => {
        updateIsSkipAllowed();
    }, [
        gameState.currentTurnCard, gameState.turns
    ])

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
                className={`px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ${!isSkipAllowed ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Skip Turn
            </button>
        </div>
    );
};

export default BluffGameControls;
