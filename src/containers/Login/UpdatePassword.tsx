import {useState} from "react";
import {ContainerWrapper} from "../../components/ContainerWrapper"
import Header from "./Header"
import {ErrorMsgs} from "../../constants/constants";
import {passwordRegex} from "../../utils/validation";
import PrimaryButton from "../../components/PrimaryButton";
import {useNavigate} from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import SuccessIcon from "../../assets/images/success.svg"
import useForm from "../../hooks/useForm";
import CustomInput from "./CustomInput";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { formData, formErrors, handleInputChange, handleSubmit } = useForm({
    initialData: { newPassword: "", confirmNewPassword: "" },
    validateField: (fieldName, value) => {
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
    },
  });
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
  
    const isValid = handleSubmit(e);
  
    if (!isValid) {
      console.log("Form has errors. Cannot update password.");
      return;
    }
  
    console.log("Password update form valid, proceeding...");
  
    setIsModalOpen(true);  // whatever you were doing on success
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
   
      <form onSubmit={handleChangePassword}>
        <CustomInput
          label="Password"
          type="password"
          name="newPassword"
          placeholderText= "******"
          value={formData.newPassword} 
          onChange={handleInputChange}
          errorMsg={formErrors.newPassword}
        />
          <CustomInput
          label="Re-enter your new password"
          type="password"
          name="confirmNewPassword"
          placeholderText= "******"
          value={formData.confirmNewPassword} 
          onChange={handleInputChange}
          errorMsg={formErrors.confirmNewPassword}
        />
      <PrimaryButton label="Update Password" onClick={handleChangePassword} disabled={disableSubmitCta()} />
    </form>

    {isModalOpen && <CustomModal showModal={isModalOpen} closeModal={closeModal} modalIcon={<img src={ SuccessIcon} alt="password updated successfully"/>} modalHeading="Password Created!"  modalSubHeading="Your password has been successfully updated. You can now use your new password to log in."/>}
    </ContainerWrapper>
  )
}

export default UpdatePassword
