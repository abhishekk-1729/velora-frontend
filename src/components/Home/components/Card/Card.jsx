import React, { useState } from 'react';
// import './Card.css';

const Card = ({ imagePosition = 'left' }) => {  // Add imagePosition prop with a default value of 'left'
  const [gradientPosition, setGradientPosition] = useState({ x: '50%', y: '50%' });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGradientPosition({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="card" 
      onMouseMove={handleMouseMove} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      style={{
        '--x': gradientPosition.x,
        '--y': gradientPosition.y,
        '--opacity': isHovered ? 1 : 0 // Control the opacity based on hover
      }}
    >
      <div className={`card-content ${imagePosition === 'right' ? 'reverse' : ''}`}>  {/* Apply 'reverse' class when imagePosition is 'right' */}
        <img src="https://via.placeholder.com/100" alt="Placeholder" className="card-image" />
        <div className="card-text">
          <h2>Card Heading</h2>
          <p>Some sample text for the card. This could be a description or some other details.</p>
        </div>
      </div>

    </div>
  );
};

export default Card;
