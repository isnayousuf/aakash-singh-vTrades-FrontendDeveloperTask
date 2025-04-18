
import {ContainerWrapper} from "../components/ContainerWrapper"
import Header from "../containers/Login/Header"
import OtpComponent from "../containers/Login/OtpComponent"

const OtpPage = () => {
  return (
    <ContainerWrapper>
    <Header headerLabel={'Enter OTP'} subHeading= {"Enter the OTP that we have sent to your email address companyadmin@gmail.com."}/>
    <OtpComponent />

  </ContainerWrapper>
  )
}

export default OtpPage