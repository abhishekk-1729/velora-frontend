import Home from "./components/Home/Home.jsx";
import About from "./components/About/aboutus";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import FAQs from "./components/FAQs/FAQs.jsx";
import Pricing from "./components/Pricing/Pricing.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import EmailVerify from "./components/EmailVerify/EmailVerify.jsx";
import EnterDetails from "./components/EnterDetails/EnterDetails";
import Status from "./components/Status/Status";
import ReferAndEarn from "./components/ReferAndEarn/ReferAndEarn";
import Dashboard from "./components/Dashboard/Dashboard";
import Pay from "./components/Pay/Pay.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/pricing", element: <Pricing /> },
    { path: "/login", element: <Login />},
    { path: "/signup", element: <SignUp /> },
    { path: "/signup/emailverify", element: <EmailVerify /> },
    { path: "/login/emailverify", element: <EmailVerify /> },
    { path: "/contact", element: <ContactUs /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/status/:id", element: <Status />},
    { path: "/signup/enterDetails", element: <EnterDetails /> },
    { path: "/referAndEarn", element: <ReferAndEarn /> },
    { path: "/pay", element: <Pay /> },
    { path: "*", element: <NotFound />, noNavFooter: true },  // Specify this route should not show Navbar or Footer
  ];
  
  export default routes;
  