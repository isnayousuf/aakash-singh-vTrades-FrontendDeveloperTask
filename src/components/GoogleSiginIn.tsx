import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn: React.FC = () => {
  const onSuccess = (credentialResponse: any) => {
    console.log('Login', credentialResponse);
  
    // Save token in localStorage
    if (credentialResponse.credential) {
      localStorage.setItem('google_token', credentialResponse.credential);
      alert('Login Successful 🎉');
    }
  };
  

  const onError = () => {
    console.log('Login Failed');
    //Todo: Handle failure logic
  };

  return (
    <div>
      <h2>Sign in with Google</h2>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap
      />
    </div>
  );
};

export default GoogleSignIn;
