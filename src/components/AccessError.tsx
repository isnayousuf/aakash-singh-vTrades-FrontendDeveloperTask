
import {Link} from "react-router-dom"

const AccessError = () => {
  return ( 
    <p className="error-text"> No user registered with this email or incorrect password. Please check your details or <span className="bottom-link"><Link to="/signUp" className="ml-4">Sign Up</Link></span>.</p>
  )
}

export default AccessError