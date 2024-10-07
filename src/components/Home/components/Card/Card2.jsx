import React from "react";

const Card2 = ({
  image = "/new2.png",
  direction,
  heading,
  color,
  text,
  glowColor,
}) => {
  const isLeftDirection = direction === "left";

  return (
    <div
      className={`mt-4 mb-24 bg-[#151b23] p-8 md:p-20 flex ${
        isLeftDirection ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-16 flex-col  mx-8 sm:mx-16 rounded-2xl`}
    >
      {/* Card Image */}
      <div className="card_image lg:w-1/2">
        <img src={image} alt={heading} className="w-full h-auto rounded-md" />
      </div>

      {/* Card Content */}
      <div className="card_content flex flex-col gap-4 w-full max-w-lg">
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
  );
};

export default Card2;
