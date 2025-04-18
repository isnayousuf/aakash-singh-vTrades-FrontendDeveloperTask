export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
};

export const clearOtpDataFromStorage = () => {
  localStorage.removeItem("otp");
  localStorage.removeItem("userEmail");
}

export const saveOtpDataIntoStorage = (otp: string) => {
   localStorage.setItem("otp", otp);
}