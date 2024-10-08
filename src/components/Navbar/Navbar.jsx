import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import trystlogo from "../../assets/Navbar/TrystLogo.png";
import Tryst24 from "../../assets/Navbar/TRYST.png";
import Company from "../../assets/Navbar/company.png";
import profileicon from "../../assets/Navbar/IconButton.png";
import navbarmenu from "../../assets/Navbar/navbarmenu.png";
import crossmenu from "../../assets/Navbar/crossmenu.png";
import NavEffect from "../../assets/Navbar/nav-mobile-effect.png";
import NavSelector from "../../assets/Navbar/selector.png";
import NavMobileBg from "../../assets/Navbar/Mobile Version_Nav Expanded.png";
import profilehov from "../../assets/Navbar/profilehov.svg";
import profileclicked from "../../assets/Navbar/profileClick.svg";
import { useEffect, useState } from "react";
import styled from "styled-components";

function Navbar() {
  const navigate = useNavigate();
  const [showNavOptions, setShowNavOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedMobileOption, setSelectedMobileOption] = useState(selectedOption);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Check if user is logged in by checking localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(true);
    setIsHovered(false);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const handleShowNavbar = () => {
    setShowNavOptions(!showNavOptions);
  };

  const handleNavbarOptionClick = (option) => {
    if (option === "Logout") {
      localStorage.removeItem('token'); // Clear token from localStorage
      navigate("/"); // Redirect to the main page or home
    } else {
      setSelectedOption(option);
      navigate(`/${option}`);
    }
    if (showNavOptions) {
      setSelectedMobileOption(option);
      handleShowNavbar();
    }
  };

  const handleScroll = () => {
    setIsNavbarVisible(window.scrollY < 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showNavOptions) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showNavOptions]);

  return (
    <Container className={`navbar ${isNavbarVisible ? "navbar-visible" : "navbar-hidden"} `}>
      
      <div className={showNavOptions ? "nav-mobile-bg" : "hidden-nav-mobile-bg"}>
        <img src={NavMobileBg} alt="" className="nav-effect-back" />
      </div>

      <div className="navbarheader">
        <div className="navbartrystlogo" onClick={() => handleNavbarOptionClick("")}>
          <img className="tryst2024img" src={Company} alt="Company Logo" />
        </div>
        <div className="navbaroptions-container">
          <div className="navbaricons">
            {[
              "Company Info",
              "Dashboard",
              "contact",
              "Pricing",
              isLoggedIn ? "Logout" : "Log in",
            ].map((option) => (
              <div
                key={option}
                className={`navbaroption ${selectedOption === option ? "navbaroption-selected" : ""}`}
                onClick={() => handleNavbarOptionClick(option=="Log in"?"login":option)}
              >
                {option}
              </div>
            ))}
          </div>
          <button className="navbarmenu" onClick={handleShowNavbar}>
            <img src={showNavOptions ? crossmenu : navbarmenu} alt="Menu Icon" />
          </button>
        </div>
      </div>

      <div className={showNavOptions ? "navbariconsmobile" : "hiddenmobiletoggle"}>
        {[
          "About",
          "Pricing",
          isLoggedIn ? "Logout" : "Sign up/Log in",
        ].map((option) => (
          <div
            key={option}
            className={`navbaroption ${selectedMobileOption === option ? "navbaroption-selected-mobile" : ""}`}
            onClick={() => handleNavbarOptionClick(option)}
          >
            {selectedMobileOption === option && (
              <img src={NavSelector} alt="" className="nav-effect-front" />
            )}
            {option}
            {selectedMobileOption === option && (
              <img src={NavEffect} alt="" />
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
