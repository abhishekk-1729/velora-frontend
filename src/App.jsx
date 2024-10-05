import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import './fonts.css';
import Navbar from "./components/Navbar/Navbar.jsx";

const App = () => {

  return (
    <main className="main-bg">
      <Router>
        <Navbar />
      </Router>
    </main>
  );
};

export default App;
