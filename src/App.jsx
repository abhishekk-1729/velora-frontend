import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import './fonts.css';
import { useState } from "react";
// import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
// import LandingPage from "./pages/landing-page/landing-page.jsx";
import { useEffect } from "react";
import axios from "axios";
import { DOMAIN } from "./domain.js";


const App = () => {
  const [eventarray, setEventarray] = useState([]);
  useEffect(() => {
    axios.get(`${DOMAIN}allevents/`)
      .then((response) => {
        setEventarray(response.data);
        console.log(response.data.competitions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <main className="main-bg">
      <Router>
        <Navbar />
        {/* <Routes>
                    <Route path="/" element={<LandingPage />} />
        </Routes> */}
        {/* <Footer /> */}
      </Router>
    </main>
  );
};

export default App;
