// src/components/PlayerDetails.js
import React from 'react';
import './PlayerDetail.css'; // Ensure you import the CSS for styling

const PlayerDetails = ({ playerName, cardsLeft, playerLogo }) => {
  return (
    <div className="player-details rounded-lg mb-2">
      {/* Player Logo */}
      <div className="flex items-center">
        <img
          src={playerLogo}
          alt={`${playerName} logo`}
          className="h-12 w-12 rounded-full mr-4"
        />
        <div className=" ">
          {/* Player Name */}
          <p className="">{playerName}</p>
        </div>
      </div>

      {/* Number of Cards Left */}
      <div className="">
        Cards Left: <span>{cardsLeft}</span>
      </div>
    </div>
  );
};

export default PlayerDetails;
