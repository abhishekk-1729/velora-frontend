import React from "react";
import "./Home.css";
import Card from "./components/Card/Card";
import Card2 from "./components/Card/Card2";
import Hero from "./components/Hero/Hero";
import HeroLast from "./components/HeroLast/HeroLast";
import Navigation_quality from "../Navigation_quality/Navigation_quality";

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

  return (
    <>
      <Hero />
      <Navigation_quality />
      <Card2
        id = "quality_1"
        direction="left"
        color={value2.color}
        heading={value2.heading}
        text={value2.text}
        //   image = {value.image}
        glowColor={value2.glowColor}
      />

      <Card2
      id = "quality_2"
        direction="right"
        color={value2.color}
        heading={value2.heading}
        text={value2.text}
        //   image = {value.image}
        glowColor={value2.glowColor}
      />
      <Card2
      id = "quality_3"
        direction="left"
        color={value2.color}
        heading={value2.heading}
        text={value2.text}
        //   image = {value.image}
        glowColor={value2.glowColor}
      />

      <Card2
      id = "quality_4"
        direction="right"
        color={value2.color}
        heading={value2.heading}
        text={value2.text}
        //   image = {value.image}
        glowColor={value2.glowColor}
      />
      <Card2
      id = "quality_5"
        direction="left"
        color={value2.color}
        heading={value2.heading}
        text={value2.text}
        //   image = {value.image}
        glowColor={value2.glowColor}
      />

      <Card2
      id = "quality_6"
        direction="right"
        color={value2.color}
        heading={value2.heading}
        text={value2.text}
        //   image = {value.image}
        glowColor={value2.glowColor}
      />

      <HeroLast />
    </>
  );
}

export default Home;
{
  /* {uniqueValues.map((value) => (
        
        <Card
          direction={value.direction} 
          color={value.color} 
          heading={value.heading} 
          text={value.text} 
        //   image = {value.image}
          glowColor = {value.glowColor}
        />
      ))} */
}
{
  /* <Card2 
          direction={value2.direction} 
          color={value2.color} 
          heading={value2.heading} 
          text={value2.text} 
        //   image = {value.image}
          glowColor = {value2.glowColor}
        /> */
}

// const uniqueValues = [
//     {
//       key: "1",
//       direction: "left",
//       color: "#39ff14", // Neon Green
//       heading: "Card 1",
//       text: "This is the first card.",
//       image: "/new2.png",
//       glowColor: "rgba(57, 255, 20, 0.2)", // Subtle Neon Green Glow
//     },
//     {
//       key: "2",
//       direction: "right",
//       color: "#ff073a", // Neon Red
//       heading: "Card 2",
//       text: "This is the second card.",
//       image: "https://via.placeholder.com/100",
//       glowColor: "rgba(255, 7, 58, 0.2)", // Subtle Neon Red Glow
//     },
//     {
//       key: "3",
//       direction: "left",
//       color: "#00f9ff", // Neon Cyan
//       heading: "Card 3",
//       text: "This is the third card.",
//       image: "https://via.placeholder.com/100",
//       glowColor: "rgba(0, 249, 255, 0.2)", // Subtle Neon Cyan Glow
//     },
//     {
//       key: "4",
//       direction: "right",
//       color: "#ff00ff", // Neon Pink
//       heading: "Card 4",
//       text: "This is the fourth card.",
//       image: "https://via.placeholder.com/100",
//       glowColor: "rgba(255, 0, 255, 0.2)", // Subtle Neon Pink Glow
//     },
//     {
//       key: "5",
//       direction: "left",
//       color: "#ffff00", // Neon Yellow
//       heading: "Card 5",
//       text: "This is the fifth card.",
//       image: "https://via.placeholder.com/100",
//       glowColor: "rgba(255, 255, 0, 0.2)", // Subtle Neon Yellow Glow
//     },
//   ];
