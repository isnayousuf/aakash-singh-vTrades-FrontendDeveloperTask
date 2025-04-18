import {Link} from "react-router-dom";
import GoogleSignIn from "./GoogleSiginIn";

const Footer = ({
  footerLabel,
  redirectionLink,
}: {
  footerLabel: string;
  redirectionLink: string;
}) => {
  return (
    <div className="footer-container">
      <div className="divider">
        <hr className="divider-line" /> <span className="divider-text">or</span>{" "}
        <hr className="divider-line" />
      </div>

      <GoogleSignIn />

      <div className="bottom-link mt-10">
        Don't have an account? <Link to={redirectionLink} className="ml-4">{footerLabel}</Link>
      </div>
    </div>
  );
};

export default Footer;
