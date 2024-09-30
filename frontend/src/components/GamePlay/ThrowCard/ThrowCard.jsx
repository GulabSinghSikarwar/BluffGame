import React, { useState } from 'react';
import { suits } from '../../../utils/constants';
import './ThrowCard.css'
const CardThrow = ({ cardsInHand, onThrow }) => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [isBluff, setIsBluff] = useState(false);

    const toggleCardSelection = (card) => {
        setSelectedCards((prev) =>
            prev.includes(card)
                ? prev.filter((c) => c !== card)
                : [...prev, card]
        );
    };

    const handleSubmit = () => {
        if (selectedCards.length > 0) {
            onThrow({ selectedCards, isBluff });
            // Clear selections after submission
            setSelectedCards([]);
            setIsBluff(false);
        }
    };

    const renderCardImage = (card) => {
        console.log("card : ", card);

        // return <></>

        // const suit = card.slice(-1); // Get the last character for the suit
        return (
            <div className="flex  items-center">
                <span className="text-lg">{card.rank}</span> {/* Display the rank */}
                <img src={suits[card.suit]} alt={card.suit} className="w-8 h-8" /> {/* Display the suit image */}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center p-4 p-6 rounded-lg w-full h-full mx-auto max-h-full overflow-y-auto player-list-container
    ">
            <div className='Sidebar-heading-container w-full flex justify-center bg-purplePallete-700 text-white py-4 rounded'>
                <h2 className=" " >Select Cards to Throw</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {cardsInHand.map((card, index) => (
                    <button
                        key={index}
                        onClick={() => toggleCardSelection(card)}
                        className={`px-4 py-2 border rounded-md ${selectedCards.includes(card)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100'
                            }`}
                    >
                        {renderCardImage(card)}
                    </button>
                ))}
            </div>

            <div className="flex items-center mb-4 bg-purplePallete-700 px-5 py-3 rounded  w-full justify-center">
                <input
                    type="checkbox"
                    id="bluff"
                    checked={isBluff}
                    onChange={(e) => setIsBluff(e.target.checked)}
                    className="mr-2"
                />
                <label htmlFor="bluff " className='text-white'>Make a Bluff</label>
            </div>

            <button
                onClick={handleSubmit}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${selectedCards.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={selectedCards.length === 0}
            >
                Throw Cards
            </button>
        </div>
    );
};

export default CardThrow;
