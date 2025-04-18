import React, { useState } from 'react';
import { GoogleLogin} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react'; 
import CustomModal from "../../components/CustomModal";


const GoogleSignIn: React.FC = () => {
  const navigate = useNavigate();
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      localStorage.setItem('google_token', credentialResponse.credential);
    }
    navigate('/dashboard');
  };

  // Error handler
  const onError = () => {
    console.error('Login Failed');
    setErrorMessage('Something went wrong during login. Please try again.');
    setShowErrorModal(true); 
  };


  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap
        theme="filled_black" 
      />

      {showErrorModal && (
        <CustomModal
          showModal={showErrorModal}
          closeModal={closeModal}
          modalIcon={<AlertTriangle color="#E5484D" style={{ width: '80px', height: '80px' }} />}
          modalHeading="Oops! Something went wrong."
          modalSubHeading={errorMessage}
          ctaLabel="Retry"
        />
      )}
    </div>
  );
};

export default GoogleSignIn;

