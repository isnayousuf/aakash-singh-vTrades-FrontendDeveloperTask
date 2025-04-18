import { useState } from "react";

interface FormData {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormProps {
  initialData: FormData;
  validateField: (fieldName: string, value: string) => string;
}

const useForm = ({ initialData, validateField }: UseFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (isSubmitted) {
      validateField(name, value);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    let isValid = true;
    const errors: FormErrors = {};

    // Validate all fields
    Object.entries(formData).forEach(([fieldName, value]) => {
      const error = validateField(fieldName, value);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);

    return isValid;
  };

  return { formData,  setFormData, formErrors, handleInputChange, handleSubmit };
};

export default useForm;
