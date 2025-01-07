import React, { useState, useEffect } from "react";

const SmoothTextSwitcher = () => {
  const [humanText, setHumanText] = useState("Chat with our team");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const messages = ["Chat with our team", "Abhishek is online!"];
    let index = 0;

    const interval = setInterval(() => {
      // Trigger fade-out
      setIsFading(true);

      setTimeout(() => {
        // Update the text after fade-out
        index = (index + 1) % messages.length;
        setHumanText(messages[index]);

        // Trigger fade-in
        setIsFading(false);
      }, 500); // Matches fade-out duration
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {humanText}
    </div>
  );
};

export default SmoothTextSwitcher;
