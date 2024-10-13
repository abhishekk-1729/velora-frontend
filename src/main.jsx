import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="853195152469-64nk38p7q3run064k54ctd5jmic0qr9l.apps.googleusercontent.com">
    <MsalProvider instance={msalInstance}>
      <Router>
        <App />
      </Router>
    </MsalProvider>
   </GoogleOAuthProvider>
);
