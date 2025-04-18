
import {ContainerWrapper} from "../components/ContainerWrapper"
import Header from "../containers/Login/Header"
import OtpComponent from "../containers/Login/OtpComponent"

const OtpPage = () => {
  const userEmail = localStorage.getItem("userEmail")
  return (
    <ContainerWrapper>
    <Header headerLabel={'Enter OTP'} subHeading= {`Enter the OTP that we have sent to your email address ${ userEmail}`}/>
    <OtpComponent />

  </ContainerWrapper>
  )
}

export default OtpPage