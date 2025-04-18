import {useNavigate} from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import {ErrorMsgs} from "../../constants/constants";
import {generateOTP, saveOtpDataIntoStorage} from "../../utils/otp-utils";
import {emailRegex, passwordRegex} from "../../utils/validation";
import CustomInput from "./CustomInput";
import useForm from "../../hooks/useForm";

export const SignUpForm = () => {
  const navigate = useNavigate()
  const { formData, formErrors, handleInputChange, handleSubmit } = useForm({
    initialData: { email: "", password: "", confirmPassword: "" },
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
        if (fieldName === "confirmPassword" && value !== formData.password) {
          error = ErrorMsgs.CONFIRM_PASSWORD_ERROR;
        }
      }
  
      return error;
    },
  });
  
 
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const isValid = handleSubmit(e);
  
    if (!isValid) {
      console.log("Form has errors. Cannot submit sign up.");
      return;
    }
  
    try {
      // Fake OTP generation
      const otp = generateOTP();
      console.log("Generated OTP:", otp);  
      saveOtpDataIntoStorage('otp', otp);
      localStorage.setItem("userEmail", formData.email);
      navigate("/otp", { state: { flowType: 'signup' } });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSignUp}>
     
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
        <CustomInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholderText= "******"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        errorMsg={formErrors.confirmPassword}
      />
      <PrimaryButton label="Sign Up" onClick={handleSignUp}  />
    </form>
  );
};
export default SignUpForm;