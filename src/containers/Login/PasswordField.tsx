import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";

interface PasswordFieldProps {
  fieldLabel: string;
  value: string;
  fieldName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  isRequired?: boolean;
  setFormErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; 


}

const PasswordField = ({ fieldLabel, value, fieldName, onChange, errorMsg ,isRequired=true, setFormErrors}:  PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFocus = () => {
    if (errorMsg) {
      setFormErrors((prev) => ({ ...prev, [fieldName]: '' })); 
    }
  };

  return (
    <div className="input-wrapper">
      <label htmlFor="userPwd" className="form-label">
        {fieldLabel}
      </label>
      <div  className={`common-input flex-center password-input ${errorMsg ? 'input-error' : ''}`}>
      <input
        id="userPwd"
        name={fieldName}
        type={showPassword ? "text" : "password"}
        placeholder="*********"
        required={isRequired}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        style={{background: 'transparent', border: 'none', outline: 'none', height: "100%", flex:1}}
      />
    
      <div onClick={handleTogglePassword} className="eye-icon">
        {showPassword ? (
          <EyeOff size={16} strokeWidth={1.3} absoluteStrokeWidth />
        ) : (
          <Eye size={16} strokeWidth={1.3} absoluteStrokeWidth />
        )}
      </div>
      </div>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

    </div>
  );
};

export default PasswordField;
