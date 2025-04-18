export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
};

export const clearOtpDataFromStorage = () => {
  sessionStorage.removeItem("otp");
  sessionStorage.removeItem("resetPasswordOtp"); 
}

export const saveOtpDataIntoStorage = (sessionKey:string, otp: string) => {
   sessionStorage.setItem(`${sessionKey}`, otp);
}

export const updateEmailInStorage = (newEmail:string) => {
  localStorage.removeItem('userEmail');
  localStorage.setItem('newEmail', newEmail);
}