import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'; 
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {CLIENT_ID} from "./constants/constants.ts";

if (!CLIENT_ID) {
  throw new Error("VITE_GOOGLE_CLIENT_ID is missing. Please set it in your .env file.");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID} >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
 
)
