import {ContainerWrapper} from "../components/ContainerWrapper"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SignUpForm from "../components/SignUpForm"

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
