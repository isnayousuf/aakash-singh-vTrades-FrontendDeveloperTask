import {Link} from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import EmailField from "./components/EmailField";
import PasswordField from "./components/PasswordField";

const LoginForm = () => {
  return (
    <div className="form">
      <EmailField fieldLabel={"Email"} />
      <PasswordField fieldLabel={"Password"} />
      <div className="flex-between">
        <div className="checkbox-group">
          <input type="checkbox" id="remember" className="checkbox-field" />
          <label htmlFor="remember" className="form-label">
            Remember Me
          </label>
        </div>
        <div className="bottom-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      <PrimaryButton />
    </div>
  );
};

export default LoginForm;
