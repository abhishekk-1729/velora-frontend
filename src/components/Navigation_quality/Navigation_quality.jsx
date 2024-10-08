import React, { useState, useEffect } from 'react';
import './Navigation_quality.css'; // Add any custom styles here

const sections = ['Delivery', 'Design', 'Performance', 'No No Code', 'Service'];
const sections2 = ['Contact Sales', 'Login'];

const tag = {'Delivery':'delivery','Design':'design','Performance':'performance', 'No No Code':'no_no_code','Service':'service'}
const tag2 = {'Contact Sales':'contact','Login':'login'}

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
        const element = document.getElementById(tag[section]);
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(tag[section]);
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
    className={`nav ${isSticky ? 'lg:sticky lg:top-0 lg:bg-[#151b23]' : 'hidden'} flex  px-16 p-5  items-center justify-between`}
    >
      <div className='flex gap-8'>


      {sections.map((section) => (
        <div
          key={section}
          className={`nav_content flex py-2 justify-center items-center ${
            activeSection === tag[section] ? 'border-b-2 border-white' : ''
          }`}
        >
          <a
            href={`/#${tag[section]}`}
            className="text-white text-[16px] font-[400] leading-[24px] font-mona-sans"
          >
            {section}
          </a>
        </div>
      ))}
            </div>
            <div className='flex gap-8'>
            {sections2.map((section) => (
        <div
          key={section}
          className={`nav_content flex py-2 justify-center items-center`}
        >
          <a
            href={`/${tag2[section]}`}
            className="text-white text-[16px] font-[400] leading-[24px] font-mona-sans"
          >
            {section}
          </a>
        </div>
      ))}

            </div>
    </nav>
  );
};

export default Navigation_quality;
