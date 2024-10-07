import React, { useState, useEffect } from 'react';
import './Navigation_quality.css'; // Add any custom styles here

const sections = ['quality_1', 'quality_2', 'quality_3', 'quality_4', 'quality_5', 'quality_6'];

const Navigation_quality = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    // Handle sticky navbar
    const heroSection = document.querySelector('.hero_section');
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting); // Sticky when hero is not visible
      },
      { threshold: 0 } // Trigger when 10% of hero is visible
    );

    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  useEffect(() => {
    // Handle section highlight
    const handleScroll = () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
    className={`nav ${isSticky ? 'lg:sticky lg:top-0 lg:bg-[#151b23]' : 'hidden'} flex  pl-16 p-6 gap-8 items-center`}
    >
      {sections.map((section) => (
        <div
          key={section}
          className={`nav_content flex py-2 justify-center items-center ${
            activeSection === section ? 'border-b-2 border-white' : ''
          }`}
        >
          <a
            href={`/#${section}`}
            className="text-white text-[16px] font-[400] leading-[24px] font-mona-sans"
          >
            {section.charAt(0).toUpperCase() + section.slice(1).replace('_', ' ')}
          </a>
        </div>
      ))}
    </nav>
  );
};

export default Navigation_quality;
