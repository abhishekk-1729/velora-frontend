import React, { useState } from "react";
import "./Card2.css"; // Make sure you have the relevant CSS

const Card2 = ({
  id = "#quality_2",
  image = "/new2.png",
  direction,
  heading,
  color,
  text,
  glowColor = "rgba(255, 255, 255, 0.5)", // Default glow color
  isVisible, // New prop to trigger animation
}) => {
  const isLeftDirection = direction === "left";
  const [gradientPosition, setGradientPosition] = useState({ x: "50%", y: "100%" });
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse move to track cursor position
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGradientPosition({ x: `${x}px`, y: `${y}px` });
  };


  return (
    <div
      id={id}
      className={`pt-16 md:pt-24 lg:pt-32 `}
    >
      <div
        className={`  card bg-[#151b23] p-8 md:p-20 flex ${
          isLeftDirection ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-16 flex-col mx-8 sm:mx-16 rounded-2xl border border-[#3d444d] ${isVisible ? 'slide-in' : 'slide-out'}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}  // Set hover to true
        onMouseLeave={() => setIsHovered(false)} // Set hover to false
        style={{
          "--x": gradientPosition.x,
          "--y": gradientPosition.y,
          "--glow-color": glowColor, // Use the glow color dynamically
          "--opacity": isHovered ? 1 : 0 // Opacity controlled by hover
        }}
      >
        {/* Card Image */}
        <div className="card_image lg:w-1/2">
          <img src={image} alt={heading} className="w-full h-auto rounded-md" />
        </div>

        {/* Card Content */}
        <div className="card_content flex flex-col gap-8 w-full max-w-lg">
          <div className="card_content_heading">
            <h2
              className={`text-[48px] font-[500] leading-[52px] font-mona-sans`}
              style={{ color: color }}
            >
              {heading}
            </h2>
          </div>
          <div className="card_content_text">
            <p
              className="text-[24px] font-[500] leading-[32px] font-mona-sans"
              style={{ color: "#9198a1" }}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;
