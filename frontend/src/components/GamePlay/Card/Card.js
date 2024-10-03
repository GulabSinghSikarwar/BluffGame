import React from "react";
import './Card.scss';

const Card = ({ card, index, totalCards }) => {
  const imageUrl = `/assets/cards/${card}.png`;

  const rotation = (index - totalCards / 2) * 10; // Spread cards
  const animationDelay = `${index * 0.2}s`;

  // Hover effect calculations (manually handling trigonometry in JS)
  const hoverDistance = '-2rem';
  const hoverAngle = `${40 - index * 5}deg`;
  const hoverRotate = `${-10 + index * 2}deg`;

  return (
    <div
      className="card"
      style={{
        transform: `rotate(${rotation}deg)`,
        animationDelay: animationDelay,
        '--hover-distance': hoverDistance,
        '--hover-rotate': hoverRotate,
      }}
    >
      <img src={imageUrl} alt={`Card ${index}`} />
    </div>
  );
};

export default Card;
