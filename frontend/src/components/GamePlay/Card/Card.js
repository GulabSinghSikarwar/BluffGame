import React, { useEffect } from 'react';
import './Card.css'; // We'll add animations and styles in this file

const Card = ({ card, index }) => {
  const imageUrl = `/assets/cards/${card.rank + card.suit}.png`;

  // Adding a useEffect to check when each card is rendered
  useEffect(() => {
    console.log('Card rendered:', card);
  }, [card]);

  return (
    <div className={`card animation-delay-${index}`}>
      <img src={imageUrl} alt={card} className="card-image" />
    </div>
  );
};

export default Card;
