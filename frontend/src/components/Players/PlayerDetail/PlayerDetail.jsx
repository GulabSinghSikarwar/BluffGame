// src/components/PlayerDetails.js
import React, { useContext, useEffect } from 'react';
import './PlayerDetail.css'; // Ensure you import the CSS for styling
import { MainContext } from '../../../contexts/mainContext';

const PlayerDetails = ({ playerName, cardsLeft, playerLogo }) => {
  const mainCtx = useContext(MainContext)
  useEffect(() => {
    console.log("username  : ", mainCtx.name);

  })
  return (
    <div className={`player-details rounded-lg mb-2 ${mainCtx.name === playerName && 'border-2 border-yellow-500'}`}>
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
