import {useState} from "react";
import {ContainerWrapper} from "../../components/ContainerWrapper"
import Header from "./Header"
import {ErrorMsgs} from "../../constants/constants";
import {passwordRegex} from "../../utils/validation";
import PrimaryButton from "../../components/PrimaryButton";
import PasswordField from "./PasswordField";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({newPassword: '',  confirmNewPassword: ''});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    newPassword: '',
    confirmNewPassword: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);


 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
      if (fieldName === "confirmNewPassword") {
        if (value !== formData.newPassword) {
          error = ErrorMsgs.CONFIRM_PASSWORD_ERROR;
        }
      }
    }
  
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  
    let isValid = true;
  
    Object.entries(formData).forEach(([fieldName, value]) => {
      validateField(fieldName, value);
      if (!value || formErrors[fieldName as keyof typeof formErrors]) {
        isValid = false;
      }
    });
  
    if (isValid) {
      try {
        setIsLoading(true);
      } catch(error) {
          console.log(error);
          
      }
    }

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
        fieldName={'newPassword'}
        value={formData.confirmNewPassword}
        onChange={handleInputChange}
        errorMsg={formErrors.confirmNewPassword}
        setFormErrors={setFormErrors} 
      />
      <PrimaryButton label="Update Password" onClick={handleSubmit} disabled={loading} />
    </form>
    </ContainerWrapper>
  )
}

export default UpdatePassword
