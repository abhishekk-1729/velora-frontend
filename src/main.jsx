import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="641078023900-3dkvi6a97jcj7nsfnlrng7ndjqaag9bb.apps.googleusercontent.com">
    
  <App />
</GoogleOAuthProvider>
)
