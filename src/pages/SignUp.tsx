import {ContainerWrapper} from "../components/ContainerWrapper"
import Footer from "../containers/Login/Footer"
import Header from "../containers/Login/Header"
import SignUpForm from "../containers/Login/SignUpForm"

const SignUp = () => {
  return (
    <ContainerWrapper>
      <Header headerLabel={'Sign Up'} />
      <SignUpForm />
      <Footer footerLabel="Sign In" redirectionLink="/" />
    </ContainerWrapper>
  )
}

export default SignUp
