// Card.js
import React, { useEffect } from 'react';

const Card = ({ card }) => {
  // Assuming card images are named in the format 'rank-suit.png'
  const imageUrl = `/assets/cards/${card}.png`; // Adjust the path as necessary
  useEffect(() => {
    console.log("card:" ,card);

  }, [])

  return (
    <div className="p-2 bg-white rounded shadow">
      <img src={imageUrl} alt={card} className="w-24 h-30" />
    </div>
  );
};

export default Card;
