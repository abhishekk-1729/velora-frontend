import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./fonts.css";
import Header from "./components/Header/Header";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import routes from "./routes";
import { matchPath } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import About from "./components/About/aboutus";

const App = () => {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation(); // Get the current location
  console.log(location);
  const shouldHideNavFooter = () => {
    const currentPath = location.pathname.toLowerCase();

    // Check if the current path matches any route in the routes array, accounting for dynamic paths
    const matchingRoute = routes.find((route) => {
      return matchPath(
        { path: route.path.toLowerCase(), exact: true },
        currentPath
      );
    });

    // If no matching route is found, or if the found route has noNavFooter set to true, return true
    return !matchingRoute || matchingRoute.noNavFooter === true;
  };

  console.log(shouldHideNavFooter());

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const isHomePage = location.pathname === "/";
  return (
    <main className="main-bg">
      {/* <div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div> */}
 {isHomePage && showHeader && <Header setShowHeader={setShowHeader} />}

      {!shouldHideNavFooter() && <Navbar />}
      <Routes>
      {/* <Route  path="/about" element={<About/>} /> */}
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      {/* Conditionally render Footer */}
      {!shouldHideNavFooter() && <Footer />}
    </main>
  );
};

export default App;
