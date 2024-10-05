import React from 'react';
import './ParallaxStars.scss'; // Corrected import statement for the SCSS file

const ParallaxStars = () => {
    return (
      <div className='parallax-stars-container' >
        <div id="stars" className='parallax-star'></div>
        <div id="stars2" className='parallax-star'></div>
        <div id="stars3" className='parallax-star'></div>
        <div id="title" className='parallax-title'>
        </div>
      </div>
    );
  };
  
  export default ParallaxStars;