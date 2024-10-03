import React, { useContext, useState } from "react";
import "./CardDeck.scss"; // Import your CSS file
import { GameContext } from "../../../contexts/GameContext";
import { MainContext } from "../../../contexts/mainContext";
import toastService from "../../../services/ToastService";

const CardDeck = () => {
  const { gameState } = useContext(GameContext);
  const { selectedCards, setSelectedCards, name } = useContext(MainContext);

  // Function to create image path
  const imagePathName = (cardname) => `/assets/cards/${cardname}.png`;

  // Function to calculate the --i value for each card
  const getIValue = (index, length) => {
    return (index - Math.floor(length / 2)); // Center the cards
  };

  // Function to toggle card selection and update MainContext
  const toggleCardSelection = (card) => {
    console.log("Checking ");

    if (!checkForTurns()) {
      console.log("here ");

      return
    }
    console.log("cardfalse : ", card);

    setSelectedCards((prev) => {
      const updatedCards = prev.includes(card)
        ? prev.filter((c) => c !== card)
        : [...prev, card];

      return updatedCards;
    }
    );
  };
  const checkForTurns = () => {
    const turns = gameState.turns
    if (name) {
      console.log("name : ", name, " turns : ", turns);

      if (turns && turns.currentTurn && turns.currentTurn.name != name) {
        console.log("error ");

        toastService.warning("Its Not Your Turn,Wait For Your Turn")
        return false
      }
    }
    return true;
  }

  return (
    <div className="card-container">
      {gameState &&
        gameState.cards &&
        gameState.cards.map((card, index) => {
          const iValue = getIValue(index, gameState.cards.length); // Calculate --i value
          const isCardSelected = selectedCards.includes(card); // Check if card is selected

          return (
            <div
              onClick={() => toggleCardSelection(card)}
              key={index}
              className={`card ${isCardSelected ? "selected-card" : ""}`} // Conditionally apply class
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
