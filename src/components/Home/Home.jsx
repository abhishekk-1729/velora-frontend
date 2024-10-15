import React, { useState, useEffect } from "react";
import "./Home.css";

import Card2 from "./components/Card/Card2";
import Hero from "./components/Hero/Hero";
import HeroLast from "./components/HeroLast/HeroLast";
import Navigation_quality from "../Navigation_quality/Navigation_quality";
import Navbar from "../Navbar/Navbar";

function Home() {
  const value2 = {
    key: "6",
    direction: "right",
    color: "#32B4AE", // Neon Yellow
    heading: "Empowering the developers",
    text: "GitHub Advanced Security enables you to find icklynnn.  ou to find icklynn  ou to find  you to find icklynnn.  ou to find icklynn  ou to find icklynn",
    image: "https://via.placeholder.com/100",
    glowColor: "rgba(255, 255, 0, 0.2)", // Subtle Neon Yellow Glow
  };

  const qualities = [
    {
      id: "delivery",
      key: "1",
      direction: "right",
      color: "#3FBA50", // Green
      heading_text: "Websites delivered in 4 weeks",
      text: "With Velora, your websites are delivered in just 4 weeks after the final UI approval, ensuring you meet your deadlines with ease.",
      image: "/assets/home/delivery",
      glowColor: "rgba(63, 186, 80, 0.2)", // Green Glow
    },
    {
      id: "design",
      key: "2",
      direction: "left",
      color: "#32B4AE", // Teal
      heading_text: "Designed with precision",
      text: "Our expert designers create beautiful, responsive websites that ensure a seamless user experience across all devices.",
      image: "/assets/home/design",
      glowColor: "rgba(50, 180, 174, 0.2)", // Teal Glow
    },
    {
      id: "performance",
      key: "3",
      direction: "right",
      color: "#F778BB", // Pink
      heading_text: "Performance optimized",
      text: "Velora websites are engineered for speed and efficiency, ensuring optimal performance that keeps your users engaged.",
      image: "/assets/home/performance",
      glowColor: "rgba(247, 120, 187, 0.2)", // Pink Glow
    },
    {
      id: "no_no_code",
      key: "4",
      direction: "left",
      color: "#FFD33D", // Yellow
      heading_text: "Code that matters",
      text: "No reliance on no-code tools. We build custom, scalable websites with full control over code for enhanced flexibility.",
      image: "/assets/home/no_no_code",
      glowColor: "rgba(255, 211, 61, 0.2)", // Yellow Glow
    },
    {
      id: "service",
      key: "5",
      direction: "right",
      color: "#DD594F", // Red
      heading_text: "Dedicated support and service",
      text: "We provide ongoing support to ensure your website functions perfectly, with a team always ready to assist you.",
      image: "/assets/home/service",
      glowColor: "rgba(221, 89, 79, 0.2)", // Red Glow
    },
  ];

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Array(qualities.length).fill(false)); // Track visibility of each card


  useEffect(() => {
    // Function to check window size
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px is a large screen size
    };

    // Set initial screen size
    checkScreenSize();

    // Add event listener to handle resize events
    window.addEventListener("resize", checkScreenSize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleCards((prev) => {
            const updated = [...prev];
            updated[index] = true; // Set the corresponding card to visible
            return updated;
          });
          observer.unobserve(entry.target); // Stop observing the card
        }
      });
    });

    const cardElements = document.querySelectorAll(".card"); // Select all cards
    cardElements.forEach((card, index) => {
      card.dataset.index = index; // Add index for tracking visibility
      observer.observe(card);
    });

    return () => {
      observer.disconnect(); // Clean up the observer
    };
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      {isLargeScreen && <Navigation_quality />}{" "}
      {/* Show navigation only on large screens */}
      {qualities.map((value,index) => (
        <Card2
          key={value.id}
          id={value.id}
          direction={value.direction}
          color={value.color}
          heading={value.heading_text}
          text={value.text}
          // image = {value.image}
          glowColor={value.glowColor}
          isVisible={visibleCards[index]} // Pass visibility state to Card2
        />
      ))}
      <HeroLast />
    </>
  );
}

export default Home;
