import React, { useState, useEffect, useRef } from "react";
import "./Card2.css"; // Make sure you have the relevant CSS

const Card2 = ({
  id = "#quality_2",
  image,
  direction,
  heading,
  color,
  text,
  glowColor = "rgba(255, 255, 255, 0.5)", // Default glow color
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null); // Create a reference for the card

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggle visibility on entering and exiting the viewport
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 } // Adjust threshold as needed
    );

    if (cardRef.current) {
      observer.observe(cardRef.current); // Observe the card element
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current); // Clean up observer on unmount
      }
    };
  }, []);

  const isLeftDirection = direction === "left";
  const [gradientPosition, setGradientPosition] = useState({
    x: "50%",
    y: "100%",
  });
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
    <div ref={cardRef} id={id} className={`pt-36 md:pt-28 lg:pt-40`}>
      <div
        className={`card bg-[#151b23] min-h-[60vh] flex ${
          isLeftDirection ? "lg:flex-row" : "lg:flex-row-reverse"
        } flex-col  mx-4 lg:mx-16 rounded-2xl border border-[#3d444d] ${
          isVisible ? "slide-in" : "slide-out"
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)} // Set hover to true
        onMouseLeave={() => setIsHovered(false)} // Set hover to false
        style={{
          "--x": gradientPosition.x,
          "--y": gradientPosition.y,
          "--glow-color": glowColor, // Use the glow color dynamically
          "--opacity": isHovered ? 1 : 0, // Opacity controlled by hover
        }}
      >
        {/* Card Image */}
        <div className={`card_image  lg:w-1/2 lg:relative lg:pt-12 ${isLeftDirection ? "lg:pr-12" : "lg:pl-12"}`}>
          <div className="lg:relative lg:w-full lg:h-full">
            <img
              src={image?image:"cardu.svg"}
              alt={heading}
              className={`lg:absolute ${isLeftDirection ? "lg:left-0 lg:bottom-0 lg:border-r lg:rounded-tr-xl" : "lg:right-0 lg:bottom-0 lg:border-l lg:rounded-tl-xl"} lg:border-t lg:border-[#3d444d]`}
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="card_content flex flex-col gap-8 p-8 md:p-28 lg:w-1/2">
          <div className={`card_content_heading ${isVisible ? "text-slide-in" : ""}`}>
            <h2
              className={`text-[48px] font-[500] leading-[52px] font-mona-sans`}
              style={{ color: color }}
            >
              {heading}
            </h2>
          </div>
          <div className={`card_content_text ${isVisible ? "text-slide-in" : ""}`}>
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
