import React, {useEffect, useState} from 'react'
import {ContainerWrapper} from "../../components/ContainerWrapper"
import Header from "./Header"
import PrimaryButton from "../../components/PrimaryButton"
import EmailField from "./EmailField"
import {generateOTP, updateEmailInStorage} from "../../utils/otp-utils"
import CustomModal from "../../components/CustomModal"
import SuccessIcon from "../../assets/images/email-sent-icon.svg";
import {useNavigate} from "react-router-dom"

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
 

  useEffect(() => {
    //Prefill field with existing email
    const oldEmail = localStorage.getItem('userEmail');
    if (oldEmail) {
      setEmail(oldEmail);
    }
  }, []);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    updateEmailInStorage(email);
    const generatedOtp = generateOTP(); // mimicking the otp generation via FE
    sessionStorage.setItem('resetPasswordOtp', generatedOtp);

    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate("/otp", { state: { flowType: 'forgot-password' } });
    }, 300);
  }

  const disableSubmitCta = () => {
    return !email;
  }

  return (
    <ContainerWrapper>
      <Header headerLabel={"Forgot Your Password?"} subHeading="Don't worry! Enter your email address, and we'll send you a link to reset it."/>
      <EmailField
        fieldLabel="Email Address"
        fieldName="userEmail"
        value={email}
        onChange={handleChange}
        errorMsg={formErrors.userEmail}
        setFormErrors={setFormErrors}
      />
      <PrimaryButton label={"Submit"} onClick={handleSubmit} disabled={disableSubmitCta()}/>

      {showModal && 
        <CustomModal showModal={showModal} closeModal={closeModal} modalIcon={<img src={SuccessIcon} alt="email sent"/>} modalHeading={"Link Sent Successfully!"} modalSubHeading="Check your inbox! We’ve sent you an email with instructions to reset your password." />
       } 
    </ContainerWrapper>
  )
}

export default ForgotPassword
