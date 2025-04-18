import { useNavigate} from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import {ErrorMsgs} from "../../constants/constants";
import {emailRegex, passwordRegex} from "../../utils/validation";
import useForm from "../../hooks/useForm";
import CustomInput from "./CustomInput";
import {useEffect, useState} from "react";

export const SignInForm = () => {
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false);

  
  const { formData, formErrors, handleInputChange,handleSubmit, setFormData  } = useForm({
    initialData: { email: "", password: "" },
    validateField: (fieldName, value) => {
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

      return error;
    },
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
      }));
      setRememberMe(true);
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const isValid = handleSubmit(e);  
  
    if (!isValid) {
      console.log("Form has errors. Cannot submit.");
      return;
    }
  
    try {
      // Fake API-like behavior
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };
  


  const handleForgotPasswordRedirection =() => {
    if (formData.email) {
      localStorage.setItem('userEmail', formData.email);
    } 
    navigate('/forgot-password')
  }


  return (
    <form onSubmit={handleSignIn}>
    <CustomInput
      label="Email Address"
      type="email"
      name="email"
      placeholderText= "navinash@workhive.com"
      value={formData.email}
      onChange={handleInputChange}
      errorMsg={formErrors.email}
    />
    <CustomInput
      label="Password"
      type="password"
      name="password"
      placeholderText= "******"
      value={formData.password}
      onChange={handleInputChange}
      errorMsg={formErrors.password}
    />
    <div className="flex-between">
       <div className="checkbox-group">
         <input 
          type="checkbox" 
          id="remember" 
          className="checkbox-field"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)} 
        />
         <label htmlFor="remember" className="form-label">
           Remember Me
         </label>
       </div>
       
       <div className="bottom-link">
          <button type="button" onClick={handleForgotPasswordRedirection} className="link-button">
          Forgot Password?
          </button>
        </div>
     </div>
    <PrimaryButton label="Sign In" onClick={handleSignIn}  />
  </form>
  );
}
    
export default SignInForm;