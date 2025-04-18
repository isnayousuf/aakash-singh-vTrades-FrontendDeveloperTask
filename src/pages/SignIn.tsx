import {ContainerWrapper} from "../components/ContainerWrapper";
import Footer from "../containers/Login/Footer";
import Header from "../containers/Login/Header";
import SignInForm from "../containers/Login/SignInForm";

const SignIn = () => {

  return (
    <ContainerWrapper>
      <Header headerLabel="Sign In" />
      <SignInForm />
      <Footer footerLabel="Sign Up" redirectionLink="/signUp" />
    </ContainerWrapper>
  );
};

export default SignIn;
