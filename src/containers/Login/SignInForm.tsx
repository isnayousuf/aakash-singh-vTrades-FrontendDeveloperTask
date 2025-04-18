import {useState} from "react";
import { useNavigate} from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import {ErrorMsgs} from "../../constants/constants";
import {emailRegex, passwordRegex} from "../../utils/validation";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

export const SignInForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (isSubmitted) {
      validateField(name, value);
    }
  };

  // Validate field
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

        // Success
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", formData.email)
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPasswordRedirection =() => {
    const existingEmail = localStorage.getItem('userEmail');
    if (!existingEmail && formData.email) {
      localStorage.setItem('userEmail', formData.email);
    }
    navigate('/forgot-password')
  }

  return (
    <form onSubmit={handleSubmit}>
      <EmailField
        fieldLabel="Email"
        value={formData.email}
        fieldName={'email'}
        onChange={handleInputChange}
        errorMsg={formErrors.email}
        setFormErrors={setFormErrors} 
      />
      <PasswordField
        fieldLabel="Password"
        value={formData.password}
        fieldName={'password'}
        onChange={handleInputChange}
        errorMsg={formErrors.password}
        setFormErrors={setFormErrors}  
      />
      <div className="flex-between">
         <div className="checkbox-group">
           <input type="checkbox" id="remember" className="checkbox-field" />
           <label htmlFor="remember" className="form-label">
             Remember Me
           </label>
         </div>
         
         <div className="bottom-link">
            <button onClick={handleForgotPasswordRedirection} className="link-button">
            Forgot Password?
            </button>
          </div>
       </div>
      <PrimaryButton label="Sign In" onClick={handleSubmit} disabled={loading} />
    </form>
  );
};
export default SignInForm;