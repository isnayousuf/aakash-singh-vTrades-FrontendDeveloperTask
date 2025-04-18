import { Timer } from "lucide-react";
import  { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import {ErrorMsgs} from "../../constants/constants";
import {clearOtpDataFromStorage, generateOTP, saveOtpDataIntoStorage} from "../../utils/otp-utils";

const OtpComponent = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const [, setCanResend] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]); 


  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    // Clear previous OTP data from localStorage
    clearOtpDataFromStorage();
    
    // Generate a new OTP
    const otp = generateOTP();
    console.log("Generated OTP:", otp);  
  
    // Save the new OTP to localStorage
    saveOtpDataIntoStorage(otp);
    
    // Reset the timer to 30 seconds and restart the process
    setTimeLeft(30); 
    setOtp(Array(6).fill("")); // Clear the OTP inputs
    inputsRef.current[0]?.focus(); // Focus the first input field
  };


  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers, Todo: move to common file

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next box if user types
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

   //Allow user to delete the otp
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  //Allow user to paste in boxes directly
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return; // Todo: Move this to common file

    const pasteArray = pasteData.split("");
    const newOtp = [...otp];

    pasteArray.forEach((char, idx) => {
      newOtp[idx] = char;
      inputsRef.current[idx]?.focus();
    });

    setOtp(newOtp);
  };

 
 
  const handleSubmit = () => {
    const savedOtp = localStorage.getItem("otp");
  
    const fullOtp = otp.join("");  // join the otp array into one string
  
    if (fullOtp === savedOtp) {
      clearOtpDataFromStorage();
      navigate("/dashboard");
    } else {
      setError(ErrorMsgs.INVALID_OTP_ERROR);
    }
  };
  



  return (
    <div>
      <div className="bottom-link mt-10">
        <Link to="/change-email">Change Email Address</Link>
      </div>

  
      <div className="flex-center gap-15 my-15">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            id={`otp-${idx}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            maxLength={1}
            className="otp-box"
          />
        ))}
      </div>

      <div className="flex-center gap-6">
        {timeLeft > 0 ? (
          <div className="flex-center gap-6">
            <Timer
              size={16}
              color="#A0A0A0"
              strokeWidth={1.25}
              absoluteStrokeWidth
            />
            <p className="timer-text">{`${timeLeft}s`}</p>
          </div>
        ) : (
          <div className="bottom-link">
            <button onClick={handleResend} className="link-button">
              Resend OTP
            </button>
          </div>
        )}
      </div>

      {error && <p className="error-text mt-5">{error}</p>}

      <PrimaryButton label="Continue" onClick={handleSubmit} />

    </div>
  );
};

export default OtpComponent;
