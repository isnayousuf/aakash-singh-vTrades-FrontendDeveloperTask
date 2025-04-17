import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";

const PasswordField = ({ fieldLabel }: { fieldLabel: string }) => {
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
        className="common-input password-input"
      />

      <span onClick={handleTogglePassword} className="eye-icon">
        {showPassword ? (
          <EyeOff size={16} strokeWidth={1.3} absoluteStrokeWidth />
        ) : (
          <Eye size={16} strokeWidth={1.3} absoluteStrokeWidth />
        )}
      </span>
    </div>
  );
};

export default PasswordField;
