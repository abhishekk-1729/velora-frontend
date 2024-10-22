import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Company from "../../assets/Navbar/company.png";
import navbarmenu from "../../assets/Navbar/navbarmenu.png";
import crossmenu from "../../assets/Navbar/crossmenu.png";
import NavEffect from "../../assets/Navbar/nav-mobile-effect.png";
import NavSelector from "../../assets/Navbar/selector.png";
import NavMobileBg from "../../assets/Navbar/Mobile Version_Nav Expanded.png";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../store/auth";

function Navbar() {
  const navigate = useNavigate();
  const [showNavOptions, setShowNavOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedMobileOption, setSelectedMobileOption] =
    useState(selectedOption);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Check if user is logged in by checking localStorage
  const { isLoggedIn, LogoutUser } = useAuth();

  const handleShowNavbar = () => {
    setShowNavOptions(!showNavOptions);
  };

//   useEffect(()=>{
//     LogoutUser();
// },[LogoutUser]);

  const navigationList = {
    'Login' : "login",
    'Dashboard': 'dashboard',
    'Refer And Earn': 'referAndEarn',
    'Pricing': 'pricing',
    'About':'about',
    'Contact':'contact',
    "":""
  }

  const handleNavbarOptionClick = (option) => {
    if (option === "Logout") {
      LogoutUser();
      localStorage.removeItem("token"); // Clear token from localStorage
      navigate("/"); // Redirect to the main page or home
    } else {
      setSelectedOption(option);
      navigate(`/${navigationList[option]}`);
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
    <Container
      className={`navbar ${
        isNavbarVisible ? "navbar-visible" : "navbar-hidden"
      } `}
    >
      <div
        className={showNavOptions ? "nav-mobile-bg" : "hidden-nav-mobile-bg"}
      >
        <img src={NavMobileBg} alt="" className="nav-effect-back" />
      </div>

      <div className="navbarheader">
        <div
          className="navbartrystlogo"
          onClick={() => handleNavbarOptionClick("")}
        >
          <img className="tryst2024im" src={Company} alt="Company Logo"/>
        </div>
        <div className="navbaroptions-container">
          <div className="navbaricons">
            {[
              "About",
              "Pricing",
              "Contact",
              "Refer And Earn",
              isLoggedIn && "Dashboard",
              isLoggedIn ? "Logout" : "Login",
            ].filter(Boolean).map((option) => (
              <div
                key={option}
                className={`navbaroption ${
                  selectedOption === option ? "navbaroption-selected" : ""
                }`}
                onClick={() => handleNavbarOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <button className="navbarmenu" onClick={handleShowNavbar}>
            <img
              src={showNavOptions ? crossmenu : navbarmenu}
              alt="Menu Icon"
            />
          </button>
        </div>
      </div>

      <div
        className={showNavOptions ? "navbariconsmobile" : "hiddenmobiletoggle"}
      >
        {[
              "About",
              "Pricing",
              "Contact",
              "Refer And Earn",
              isLoggedIn && "Dashboard",
              isLoggedIn ? "Logout" : "Login",
            ].filter(Boolean).map((option) => (
          <div
            key={option}
            className={`navbaroption ${
              selectedMobileOption === option
                ? "navbaroption-selected-mobile"
                : ""
            }`}
            onClick={() => handleNavbarOptionClick(option)}
          >
            {selectedMobileOption === option && (
              <img src={NavSelector} alt="" className="nav-effect-front" />
            )}
            {option}
            {selectedMobileOption === option && <img src={NavEffect} alt="" />}
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
