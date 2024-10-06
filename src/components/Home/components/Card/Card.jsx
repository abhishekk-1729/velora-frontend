import React, { useState } from 'react';
import './Card.css';

const Card = ({ direction = 'left', color = '#ffffff', heading = 'Heading', text = 'Sample text goes here.', image = '/new2.png', glowColor = 'rgba(0, 123, 255, 0.2)' }) => {
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
      }}
    >
      <div className={`card-content ${direction === 'right' ? 'reverse' : ''}`}>
        <div className="card-image-container">
          <img src={image} alt="Placeholder" className="card-image" />
        </div>
        <div className="card-text">
          <h2 style={{ color }}>{heading}</h2>
          <p>{text}</p>
        </div>
      </div>

      {/* Glow effect that does not overlap the image */}
      <div 
        className={`glow-overlay ${isHovered ? 'visible' : ''}`}
        style={{
          background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), ${glowColor}, transparent 80%)`,
        }}
      />
    </div>
  );
};

export default Card;
