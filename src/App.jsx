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

const App = () => {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation(); // Get the current location
  console.log(location);
  const shouldHideNavFooter = () => {
    // Convert the incoming pathname to lowercase
    const currentPath = location.pathname.toLowerCase();
    
    // Check if the current path matches any route in the routes array
    const matchingRoute = routes.find(route => route.path.toLowerCase() === currentPath);
    
    // If no matching route is found, or if the found route has noNavFooter set to true, return true
    return !matchingRoute || (matchingRoute.noNavFooter === true);
  };
  
  
  console.log(shouldHideNavFooter());
  return (
    <main className="main-bg">
      {showHeader && !shouldHideNavFooter() ? (
        <Header setShowHeader={setShowHeader} />
      ) : (
        <></>
      )}

      {!shouldHideNavFooter() && <Navbar />}
      <Routes>
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
