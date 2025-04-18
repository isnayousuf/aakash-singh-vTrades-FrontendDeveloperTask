import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const GoogleSignIn: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log('Decoded User Info:', decoded);
  
      // For example
      console.log('Name:', decoded.name);
      console.log('Email:', decoded.email);
      
      // Save to localStorage
      localStorage.setItem('google_token', credentialResponse.credential);
    }
    navigate('/dashboard');
  };

  const onError = () => {
    console.log('Login Failed');
    //Todo: Handle failure logic
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap
      />
    </div>
  );
};

export default GoogleSignIn;
