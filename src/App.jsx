import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import './fonts.css';
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/aboutus";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import FAQs from "./components/FAQs/FAQs.jsx";
import Pricing from "./components/Pricing/Pricing.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/Login/Login.jsx";

const App = () => {

  return (
    <main className="main-bg">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
       <Route path="/about" element={<About />} />
       <Route path="/pricing" element={<Pricing />} />
       <Route path="/login" element={<Login />} />
         {/* <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          
          <Route path="/footer" element={<Footer />} /> */}
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
