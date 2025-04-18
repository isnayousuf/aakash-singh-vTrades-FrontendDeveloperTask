import {useState} from "react";
import {ContainerWrapper} from "../../components/ContainerWrapper"
import Header from "./Header"
import {ErrorMsgs} from "../../constants/constants";
import {passwordRegex} from "../../utils/validation";
import PrimaryButton from "../../components/PrimaryButton";
import PasswordField from "./PasswordField";
import {useNavigate} from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import SuccessIcon from "../../assets/images/success.svg"

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({newPassword: '',  confirmNewPassword: ''});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    newPassword: '',
    confirmNewPassword: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'newPassword') {
        return {
          ...prev,
          newPassword: value,
          confirmNewPassword: '', // Clear confirm password if new password is changing
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });

   

    if (isSubmitted) {
      validateField(name, value);
  
      // Special case: If password changes, revalidate confirmPassword too
      if (name === "newPassword" && formData.confirmNewPassword) {
        validateField("confirmNewPassword", formData.confirmNewPassword);
      }
    }
  
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";
    if (!value) {
      error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else {
      if (fieldName === "newPassword" && !passwordRegex.test(value)) {
        error = ErrorMsgs.PASSWORD_ERROR;
      }
      if (fieldName === "confirmNewPassword" && value !== formData.newPassword) {
        error = ErrorMsgs.CONFIRM_PASSWORD_ERROR;
      }
    }
    return error;
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  
    let isValid = true;
    const errors: { [key: string]: string } = {};
  
    Object.entries(formData).forEach(([fieldName, value]) => {
      const error = validateField(fieldName, value);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    });
  
    setFormErrors(errors);
  
    if (isValid) {
      try {
        setIsModalOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const redirectToSigninPage =()=> {
    setTimeout(() => {
      navigate("/");
    }, 300);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    redirectToSigninPage();
   
  }

  const disableSubmitCta = () => {
    return !formData.newPassword || !formData.confirmNewPassword;
  }

  return (
    <ContainerWrapper>
      <Header headerLabel="Create New Password" subHeading="Choose a strong and secure password to keep your account safe. Make sure it’s easy for you to remember, but hard for others to guess!"/>
   
      <form onSubmit={handleSubmit}>
      
      <PasswordField
        fieldLabel="Password"
        fieldName={'newPassword'}
        value={formData.newPassword}
        onChange={handleInputChange}
        errorMsg={formErrors.newPassword}
        setFormErrors={setFormErrors} 
      />

      <PasswordField
        fieldLabel="Re-enter your new password"
        fieldName={'confirmNewPassword'}
        value={formData.confirmNewPassword}
        onChange={handleInputChange}
        errorMsg={formErrors.confirmNewPassword}
        setFormErrors={setFormErrors} 
      />
      <PrimaryButton label="Update Password" onClick={handleSubmit} disabled={disableSubmitCta()} />
    </form>

    {isModalOpen && <CustomModal showModal={isModalOpen} closeModal={closeModal} modalIcon={<img src={ SuccessIcon} alt="password updated successfully"/>} modalHeading="Password Created!"  modalSubHeading="Your password has been successfully updated. You can now use your new password to log in."/>}
    </ContainerWrapper>
  )
}

export default UpdatePassword
