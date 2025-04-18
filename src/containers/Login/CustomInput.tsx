import {CircleAlert, Eye, EyeOff} from "lucide-react";
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
  onFocus:(fieldName:string) => void;
}
const CustomInput = ({ label, type, name, placeholderText, value, onChange, onFocus, errorMsg, ...props }: CustomInputProps) => {
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
          onFocus={() => {onFocus(name)}}
          {...props}
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

      {errorMsg && <p className="error-text">
        <CircleAlert className="error-icon" size={16} strokeWidth={1.5} absoluteStrokeWidth />
        <span>{errorMsg}</span>
        </p>}
    </div>
  );
};

export default CustomInput;