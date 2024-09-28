import React from 'react';
import Card from '../Card';
import './PlayerHand.css';

const PlayerHand = ({ selectedPlayer }) => {
    return (
        <div className="player-hand-container w-full mt-4">
            {/* <h4 className="mb-2">Your Hand:</h4> */}
            <div className="player-hand w-full"> {/* player-hand grid container */}
                {selectedPlayer.cards.map((card, index) => (
                    <Card key={index} card={card} className="" />))}
            </div>
        </div>
    );
};

export default PlayerHand;
