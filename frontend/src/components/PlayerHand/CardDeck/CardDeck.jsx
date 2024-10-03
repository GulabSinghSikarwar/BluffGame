import React, { useContext } from "react";
import "./CardDeck.scss"; // Import your CSS file
import { GameContext } from "../../../contexts/GameContext";

const CardDeck = () => {
  const { gameState } = useContext(GameContext);

  // Function to create image path
  const imagePathName = (cardname) => {
    return `/assets/cards/${cardname}.png`;
  };

  // Function to calculate the --i value for each card
  const getIValue = (index, length) => {
    if (index < 0 || index >= length) {
      return null; // Return null if the index is out of bounds
    }
    // Center the cards around the middle
    return (index - Math.floor(length / 2)); // Calculate the value of i
  };

  return (
    <div className="card-container">
      {gameState &&
        gameState.cards &&
        gameState.cards.map((card, index) => {
          const iValue = getIValue(index, gameState.cards.length); // Calculate the --i value

          return (
            <div
              key={index}
              className="card"
              style={{ "--i": iValue }} // Set the --i CSS variable
            >
              <img src={imagePathName(card)} alt={`Card ${index}`} />
            </div>
          );
        })}
    </div>
  );
};

export default CardDeck;
