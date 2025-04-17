import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";

interface PasswordFieldProps {
  fieldLabel: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  isRequired?: boolean;
}

const PasswordField = ({ fieldLabel, value, onChange, errorMsg ,isRequired=true}:  PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-wrapper">
      <label htmlFor="userPwd" className="form-label">
        {fieldLabel}
      </label>
      <input
        id="userPwd"
        type={showPassword ? "text" : "password"}
        placeholder="*********"
        className={`common-input  password-input ${errorMsg ? 'input-error' : ''}`}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
    
      <span onClick={handleTogglePassword} className="eye-icon">
        {showPassword ? (
          <EyeOff size={16} strokeWidth={1.3} absoluteStrokeWidth />
        ) : (
          <Eye size={16} strokeWidth={1.3} absoluteStrokeWidth />
        )}
      </span>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

    </div>
  );
};

export default PasswordField;
