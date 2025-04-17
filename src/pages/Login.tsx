import Header from "../containers/Login/components/Header";
import Footer from "../containers/Login/components/Footer";
import LoginForm from "../containers/Login/LoginForm";
// import CompanyInfoImg from "../assets/images/brand-signup.svg"
const Login = () => {

  const label ='Sign In';
 

  return (
    <div className="login-page">
      <div className="left-side">
        <div className="container-img"></div>
        {/* <img src={CompanyInfoImg} alt="company brand info" style={{width: "100%", height:"100%"}}/> */}
      </div>
     <div className="right-side">
     <div className="right-side-container">
        <Header headerLabel={label}/>
         <LoginForm />
        <Footer footerLabel={label} redirectionLink="/signup"/>
      </div>
     </div>
    </div>
  );
};

export default Login;
