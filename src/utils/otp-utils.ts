export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
};

export const clearOtpDataFromStorage = () => {
  sessionStorage.removeItem("otp");
  sessionStorage.removeItem("resetPasswordOtp"); 
  localStorage.removeItem("userEmail");
}

export const saveOtpDataIntoStorage = (otp: string) => {
   sessionStorage.setItem("otp", otp);
}

export const updateEmailInStorage = (newEmail:string) => {
  localStorage.removeItem('userEmail');
  localStorage.setItem('newEmail', newEmail);
}