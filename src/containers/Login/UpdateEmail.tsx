import React, { useEffect, useState,  } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import { emailRegex } from "../../utils/validation";
import { ContainerWrapper } from "../../components/ContainerWrapper";
import Header from "./Header";
import { updateEmailInStorage } from "../../utils/otp-utils";
import useForm from "../../hooks/useForm";
import CustomInput from "./CustomInput";
import {getUserByEmail} from "../../utils/index.db";
import AccessError from "../../components/AccessError";

const UpdateEmail = () => {
  const navigate = useNavigate();
  const [hasAccessError, setHasAccessError] = useState(false);

  const { formData, formErrors, handleInputChange, handleSubmit,  handleFocus   } =
    useForm({
      initialData: { email: "" },
      validateField: (fieldName, value) => {
        let error = "";

        if (!value) {
          error = `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
        } else if (fieldName === "email" && !emailRegex.test(value)) {
          error = "Please enter a valid email address.";
        }

        return error;
      },
    });

  useEffect(() => {
    const oldEmail = localStorage.getItem("userEmail");
    if (oldEmail) {
      const fakeEvent = {
        target: {
          name: "email",
          value: oldEmail,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      handleInputChange(fakeEvent);
    }
  }, [handleInputChange]);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = handleSubmit(e);

    if (!isValid) {
      console.log("Form has errors. Cannot update email.");
      return;
    }

    try {
      const user = await getUserByEmail(formData.email); 

      if (!user) {
        setHasAccessError(true); 
        return;
      }

      setHasAccessError(false);
      updateEmailInStorage(formData.email);

    } catch (error) {
      console.error("Error fetching user:", error);
      setHasAccessError(true);
    }

   
    navigate("/otp");
  };
  return (
    <ContainerWrapper>
      <Header
        headerLabel={"Update Email Address"}
        subHeading="Enter your new email address. We'll send a verification OTP to confirm the change."
      />

      <form onSubmit={handleUpdateEmail}>
      {hasAccessError &&   
        <AccessError />    
      }
        <CustomInput
          label="New Email Address"
          type="email"
          name="email"
          placeholderText="navinash@workhive.com"
          value={formData.email}
          onChange={handleInputChange}
          errorMsg={formErrors.email}
          onFocus={handleFocus}
        />
        <PrimaryButton label="Update" onClick={handleUpdateEmail} />
      </form>
      <div className="bottom-link mt-10">
        Changed your mind?{" "}
        <Link to="/otp" className="ml-4">
          Go back to OTP
        </Link>
      </div>
    </ContainerWrapper>
  );
};

export default UpdateEmail;
