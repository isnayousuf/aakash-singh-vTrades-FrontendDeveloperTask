import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import EmailField from "./EmailField";
import {emailRegex} from "../../utils/validation";
import {ContainerWrapper} from "../../components/ContainerWrapper";
import Header from "./Header";
import {updateEmailInStorage} from "../../utils/otp-utils";

const UpdateEmail = () => {
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  
  useEffect(() => {
    const oldEmail = localStorage.getItem('userEmail');
    if (oldEmail) {
      setEmail(oldEmail);
    }
  }, []);
  
  const handleSubmit = () => {
    if (!email || !emailRegex.test(email)) {
      setFormErrors({ userEmail: 'Please enter a valid email address.' });
      return;
    }

    updateEmailInStorage(email);
    // Simulate sending OTP to the new email
    console.log(`OTP sent to ${email}`);
    navigate('/otp');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <ContainerWrapper>
    <Header headerLabel={'Update Email Address'}    subHeading="Enter your new email address. We'll send a verification OTP to confirm the change."  />

    <div>
      <EmailField
        fieldLabel="New Email Address"
        fieldName="userEmail"
        value={email}
        onChange={handleChange}
        errorMsg={formErrors.userEmail}
        setFormErrors={setFormErrors}
      />
      <PrimaryButton label="Update" onClick={handleSubmit} />

    </div>
    <div className="bottom-link mt-10">
      Changed your mind? <Link to="/otp" className="ml-4">Go back to OTP</Link>
    </div>
  </ContainerWrapper>
  
  );
};

export default UpdateEmail