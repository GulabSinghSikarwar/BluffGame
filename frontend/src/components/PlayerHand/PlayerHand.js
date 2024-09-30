import React, { useState } from 'react';
import Card from '../GamePlay/Card/Card';
import './PlayerHand.css';

const PlayerHand = ({ selectedPlayer }) => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  // Function to manually trigger the animation
  const startAnimation = () => {
    setTriggerAnimation(false); // Reset animation state
    setTimeout(() => {
      setTriggerAnimation(true); // Set it to true after a small timeout to re-trigger
    }, 100); // Adjust delay if necessary
  };

  return (
    <div className="player-hand-container w-full mt-4">
      {/* <button onClick={startAnimation} className="mb-4 bg-blue-500 text-white p-2 rounded">
        Start Animation
      </button> */}
      <div className="player-hand w-full"> {/* player-hand grid container */}
        {selectedPlayer.cards.map((card, index) => (
          <Card key={index} card={card} index={index} triggerAnimation={triggerAnimation} />
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
