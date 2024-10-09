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
import SignUp from "./components/SignUp/SignUp.jsx";
import EmailVerify from "./components/EmailVerify/EmailVerify.jsx";
import EnterDetails from "./components/EnterDetails/EnterDetails";
import Status from "./components/Status/Status";
import ReferAndEarn from "./components/ReferAndEarn/ReferAndEarn";
import Header from "./components/Header/Header";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {

  const [showHeader,setShowHeader] = useState(true);

  return (
    <main className="main-bg">
      <Router>{
      showHeader?<Header setShowHeader={setShowHeader}/>:<></>}

        <Routes>
          <Route path="/" element={<Home/>} />
       <Route path="/about" element={<About />} />
       <Route path="/pricing" element={<Pricing />} />
       <Route path="/login" element={<Login />} />
       <Route path="/contact" element={<ContactUs />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/emailverify" element={<EmailVerify />} />
       <Route path="/status" element={<Status />} />
       <Route path="/enterDetails" element={<EnterDetails />} />
       <Route path="/referAndEarn" element={<ReferAndEarn />} />
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
