import {useState} from "react";
import PrimaryButton from "./PrimaryButton";
import {ErrorMsgs} from "../constants/constants";
import {emailRegex, passwordRegex} from "../utils/validation";
import {useNavigate} from "react-router-dom";
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";

export const SignUpForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '',  confirmPassword: ''});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (isSubmitted) {
      validateField(name, value);
  
      // Special case: If password changes, revalidate confirmPassword too
      if (name === "password" && formData.confirmPassword) {
        validateField("confirmPassword", formData.confirmPassword);
      }
    }
  
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";
  
    if (!value) {
      error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else {
      if (fieldName === "email" && !emailRegex.test(value)) {
        error = ErrorMsgs.EMAIL_ERROR;
      }
      if (fieldName === "password" && !passwordRegex.test(value)) {
        error = ErrorMsgs.PASSWORD_ERROR;
      }
      if (fieldName === "confirmPassword") {
        if (value !== formData.password) {
          error = ErrorMsgs.CONFIRM_PASSWORD_ERROR;
        }
      }
    }
  
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
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
      console.log("on Success", formData);
  
      try {
        setLoading(true);
  
        // Fake API-like behavior
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        // Simulate sending OTP to user's email
        console.log('Sending OTP to:', formData.email);
  
        // Redirect to OTP page
        navigate("/otp");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <EmailField
        fieldLabel="Email Address"
        value={formData.email}
        fieldName={'email'}
        onChange={handleInputChange}
        errorMsg={formErrors.email}
       
        setFormErrors={setFormErrors} 
      />
      <PasswordField
        fieldLabel="Password"
        fieldName={'password'}
        value={formData.password}
        onChange={handleInputChange}
        errorMsg={formErrors.password}
        setFormErrors={setFormErrors} 
      />

      <PasswordField
        fieldLabel="Confirm"
        fieldName={'confirmPassword'}
        value={formData.confirmPassword}
        onChange={handleInputChange}
        errorMsg={formErrors.confirmPassword}
        setFormErrors={setFormErrors} 
      />
      <PrimaryButton label="Sign In" onClick={handleSubmit} disabled={loading} />
    </form>
  );
};
export default SignUpForm;