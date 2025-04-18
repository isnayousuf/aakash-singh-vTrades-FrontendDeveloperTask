
import {ContainerWrapper} from "../components/ContainerWrapper"
import Header from "../components/Header"
import OtpComponent from "../components/OtpComponent"

const OtpPage = () => {
  return (
    <ContainerWrapper>
    <Header headerLabel={'Enter OTP'} subHeading= {"Enter the OTP that we have sent to your email address companyadmin@gmail.com."}/>
    <OtpComponent />

  </ContainerWrapper>
  )
}

export default OtpPage