import React from 'react';

const Card = ({ card, index, triggerAnimation }) => {
  const imageUrl = `/assets/cards/${card}.png`;

  const animationStyle = triggerAnimation
    ? {
      animation: `flyIn 2s ease forwards`,
      animationDelay: `${index * 0.2}s`,
    }
    : {}; // No animation if triggerAnimation is false

  return (
    <div className="card p-2 rounded shadow" style={animationStyle}>
      <img src={imageUrl} alt={card} className="w-24 h-30" />
    </div>
  );
};

export default Card;
