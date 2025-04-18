import React, { useEffect, useState } from "react";
import { ContainerWrapper } from "../../components/ContainerWrapper";
import Header from "./Header";
import PrimaryButton from "../../components/PrimaryButton";
import { generateOTP, updateEmailInStorage } from "../../utils/otp-utils";
import CustomModal from "../../components/CustomModal";
import SuccessIcon from "../../assets/images/email-sent-icon.svg";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { emailRegex } from "../../utils/validation";
import CustomInput from "./CustomInput";
import { getUserByEmail } from "../../utils/index.db";
import AccessError from "../../components/AccessError";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hasAccessError, setHasAccessError] = useState(false);

  const { formData, formErrors, handleInputChange, handleSubmit , handleFocus} = useForm({
    initialData: { email: "" },
    validateField: (fieldName, value) => {
      let error = "";
      if (!value) {
        error = "Email is required";
      } else if (fieldName === "email" && !emailRegex.test(value)) {
        error = "Invalid email address";
      }
      return error;
    },
  });

  useEffect(() => {
    const oldEmail = localStorage.getItem("userEmail");
    if (oldEmail) {
      handleInputChange({
        target: { name: "email", value: oldEmail },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, []);

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = handleSubmit(e);

    if (!isValid) {
      console.log("Form has errors, cannot submit forgot password.");
      return;
    }

    try {
      // Check if the user exists in IndexedDB
      const user = await getUserByEmail(formData.email); // Assuming getUserByEmail is a function that checks IndexedDB

      if (!user) {
        setHasAccessError(true); // Show error message if no user is found
        return;
      }

      setHasAccessError(false);
      updateEmailInStorage(formData.email);
      const generatedOtp = generateOTP();
      sessionStorage.setItem("resetPasswordOtp", generatedOtp);

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      setHasAccessError(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate("/otp", { state: { flowType: "forgot-password" } });
    }, 300);
  };

  const disableSubmitCta = () => {
    return !formData.email || !!formErrors.email;
  };

  return (
    <ContainerWrapper>
      <Header
        headerLabel={"Forgot Your Password?"}
        subHeading="Don't worry! Enter your email address, and we'll send you a link to reset it."
      />

      <form onSubmit={handleForgotPasswordSubmit}>
      {hasAccessError &&   
        <AccessError />    
      }

        <CustomInput
          label="Email Address"
          type="email"
          name="email"
          placeholderText="navinash@workhive.com"
          value={formData.email}
          onChange={handleInputChange}
          errorMsg={formErrors.email}
          onFocus={handleFocus}
        />
        <PrimaryButton
          label={"Submit"}
          onClick={handleForgotPasswordSubmit}
          disabled={disableSubmitCta()}
        />
      </form>
      {showModal && (
        <CustomModal
          showModal={showModal}
          closeModal={closeModal}
          modalIcon={<img src={SuccessIcon} alt="email sent" />}
          modalHeading={"Link Sent Successfully!"}
          modalSubHeading="Check your inbox! We’ve sent you an email with instructions to reset your password."
        />
      )}
    </ContainerWrapper>
  );
};

export default ForgotPassword;
