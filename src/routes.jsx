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
import GoogleLogin from "./components/GoogleLogin/GoogleLogin.jsx"
// import MicrosoftLogin from "./components/GoogleLogin/MicrosoftLogin.jsx";
import Microsoft from "./components/GoogleLogin/microsoft.jsx";
import TermsAndCondition from "./components/TermsAndCondition/TermsAndCondition.jsx";
// import FAQs from "./components/FAQs/FAQs.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import Logout from "./components/Logout/Logout.jsx";
import AdminChat from "./components/Chat/AdminChat.jsx"
import Chat from "./components/Chat/ChatBot.jsx"

const routes = [
    { path: "/", element: <Home />, noNavFooter:true },
    { path: "/about", element: <About /> },
    { path: "/pricing", element: <Pricing /> ,noNavFooter: true},
    { path: "/login", element: <Login />, noNavFooter: true},
    { path: "/logout", element: <Logout />, noNavFooter: true},
    { path: "/signup", element: <SignUp />, noNavFooter: true },
    { path: "/signup/emailverify", element: <EmailVerify />,noNavFooter: true },
    { path: "/login/emailverify", element: <EmailVerify />,noNavFooter: true },
    { path: "/contact", element: <ContactUs /> ,noNavFooter: true},
    { path: "/dashboard", element: <Dashboard /> ,noNavFooter: true},
    { path: "/status/:id", element: <Status />, noNavFooter: true},
    { path: "/signup/enterDetails", element: <EnterDetails />,noNavFooter:true },
    { path: "/googleLogin", element: <GoogleLogin /> },
    { path: "/microsoftLogin", element: <Microsoft />, noNavFooter: true },
    { path: "/referAndEarn", element: <ReferAndEarn /> },
    { path: "/privacypolicy", element: <PrivacyPolicy /> },
    { path: "/faqs", element: <FAQs /> },
    { path: "/termsandconditions", element: <TermsAndCondition /> },
    { path: "/pay", element: <Pay />  , noNavFooter: true },
    { path: "*", element: <NotFound />, noNavFooter: true },  // Specify this route should not show Navbar or Footer
    { path: "chat", element:<Chat/>, noNavFooter: true },  // Specify this route should not show Navbar or Footer
    { path: "adminChat", element:<AdminChat/>, noNavFooter: true },  // Specify this route should not show Navbar or Footer
    { path: "*", element: <NotFound />, noNavFooter: true },  // Specify this route should not show Navbar or Footer
  ];
  
  export default routes;
  