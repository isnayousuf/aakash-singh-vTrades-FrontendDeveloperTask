import {ContainerWrapper} from "../components/ContainerWrapper";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignInForm from "../components/SignInForm";

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
