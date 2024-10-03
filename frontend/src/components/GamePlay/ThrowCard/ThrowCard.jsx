import React, { useContext, useEffect, useState } from 'react';
import { suits } from '../../../utils/constants';
import './ThrowCard.css';
import { SocketContext } from '../../../contexts/socketContext';
import { GameContext } from '../../../contexts/GameContext';
import { MainContext } from '../../../contexts/mainContext';
import { useModal } from '../../../contexts/ModalContext';
import { ButtonTypes } from '../../../utils/app.enum';
import BluffGameControls from '../BluffGameControls/BluffGameControls';

const CardThrow = ({ cardsInHand }) => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [rankInput, setRankInput] = useState(''); // State for rank input
    const { leaveGame, throwCard } = useContext(SocketContext);
    const { gameState } = useContext(GameContext)
    const mainCtx = useContext(MainContext)
    const [throwCardAllowed, setThrowCardAllowed] = useState(false)
    const { openModal } = useModal()

    const toggleCardSelection = (card) => {
        setSelectedCards((prev) =>
            prev.includes(card)
                ? prev.filter((c) => c !== card)
                : [...prev, card]
        );
    };

    const handleSubmit = () => {

        if (!throwCardAllowed) {
            showWarning()
            return
        }
        if (selectedCards.length > 0 && rankInput) {
            const cardData = { rank: rankInput, cards: selectedCards }
            throwCard(cardData)
            setSelectedCards([]);
            setRankInput(''); // Clear rank input after submission
        }
    };

    /**
     * Extracts the rank and suit from a card notation.
     * @param {string} card - The card notation (e.g., "4S", "AC").
     * @returns {{ rank: string, suit: string }} An object containing the rank and suit of the card.
     */

    function getRankAndSuit(card) {
        // Check if the card is not empty and has at least one character
        if (!card || card.length === 0) {
            throw new Error("Invalid card notation");
        }
        // Extract the rank (all characters except the last one)
        const rank = card.slice(0, card.length - 1);
        // Extract the suit (last character)
        const suit = card.charAt(card.length - 1);

        return { rank, suit };
    }

    const renderCardImage = (card) => {
        const { rank, suit } = getRankAndSuit(card);
        return (
            <div className="flex items-center">
                <span className="text-lg">{rank}</span> {/* Display the rank */}
                <img src={suits[suit]} alt={rank} className="w-8 h-8" /> {/* Display the suit image */}
            </div>
        );
    };

    const showWarning = () => {
        openModal({
            title: "Warning Action",
            message: "You are not allowed to Throw Card",
            onConfirm: () => console.log("OK "),
            confirmText: "Yes, proceed",
            cancelText: "Cancel",
            buttonType: ButtonTypes.WARNING
        })
    }

    useEffect(() => {


        if (mainCtx) {
            const name = mainCtx.name;
            const turns = gameState.turns
            if (name) {

                if (turns && turns.currentTurn && turns.currentTurn.name == mainCtx.name) {

                    setThrowCardAllowed(true)
                } else {
                    setThrowCardAllowed(false)
                }
            }
        }

    }, [gameState.turns])

    return (
        <div className="flex flex-col items-center p-4 p-6 rounded-lg w-full h-full mx-auto max-h-full overflow-y-auto player-list-container">
            <div className='Sidebar-heading-container w-full flex justify-center bg-purplePallete-700 text-white py-4 rounded'>
                <h2>Select Cards to Throw</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {gameState && gameState.cards && gameState.cards.map((card, index) => (
                    <button
                        key={index}
                        onClick={() => toggleCardSelection(card)}
                        className={`px-4 py-2 border rounded-md ${selectedCards.includes(card) ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                    >
                        {renderCardImage(card)}
                    </button>
                ))}
            </div>
                
            {/* Input field for the rank */}
            <div className="mb-4 w-full bg-purplePallete-700 text-white py-4 px-4 rounded">
                <label htmlFor="rankInput" className="text-lg text-white mb-2 mt-8">Enter Rank:</label> {/* Added mt-8 */}
                <input
                    type="text"
                    id="rankInput"
                    value={rankInput}
                    onChange={(e) => setRankInput(e.target.value.toUpperCase())}
                    className="border uppercase  text-black rounded-md p-2 w-full focus:outline-none focus:border-violet-500 mt-4" // Existing styles
                    placeholder="Enter rank (e.g., true or false)"
                />
                <div className='mt-4'></div>
                <label className="text-lg text-white mt-8">Number of Cards Selected: {selectedCards.length}</label> {/* Existing styles */}
            </div>
            <BluffGameControls throwCardHandeler={handleSubmit} selectedCards={selectedCards} rankInput={rankInput} />
        </div>
    );
};

export default CardThrow;
