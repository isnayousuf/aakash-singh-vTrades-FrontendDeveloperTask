import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_ID = '813056135873-fpsed6o6qn302hd1cn59i6b83rp7lgq7.apps.googleusercontent.com'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID} >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
 
)
