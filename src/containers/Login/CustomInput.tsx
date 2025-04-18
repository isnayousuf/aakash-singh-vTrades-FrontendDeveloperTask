import {Eye, EyeOff} from "lucide-react";
import React, {useState} from "react";

interface CustomInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholderText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg: string;
  isRequired?: boolean;
}
const CustomInput = ({ label, type, name, placeholderText, value, onChange, errorMsg, ...props }: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="input-wrapper">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <div className={`common-input flex-center ${errorMsg ? 'input-error' : ''}`}>
        <input
          id={name}
          name={name}
          type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
          {...props}
          // style={{background: 'transparent', border: 'none', outline: 'none', height: "100%", flex:1}}
        />

        {isPasswordField && (
          <div onClick={togglePasswordVisibility} className="eye-icon">
            {showPassword ? (
              <EyeOff size={16} strokeWidth={1.3} absoluteStrokeWidth />
            ) : (
              <Eye size={16} strokeWidth={1.3} absoluteStrokeWidth />
            )}
          </div>
        )}
      </div>

      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
};

export default CustomInput;