import { Timer } from "lucide-react";
import  { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import {ErrorMsgs} from "../../constants/constants";
import {clearOtpDataFromStorage, generateOTP, saveOtpDataIntoStorage} from "../../utils/otp-utils";

const OtpComponent = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const [, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(true); 

  const navigate = useNavigate();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]); 
  const location = useLocation();
  const flowType = location.state?.flowType;
  const isForgotPasswordFlow = flowType === 'forgot-password';


  //Autofill otp from the session storage
  useEffect(() => {
    const timer = setTimeout(() => {
      const key = isForgotPasswordFlow ? 'resetPasswordOtp' : 'otp';
      const storedOtp = sessionStorage.getItem(key);
      if (storedOtp && storedOtp.length === 6) {
        const otpArray = storedOtp.split("");
        setOtp(otpArray);
        inputsRef.current[otpArray.length - 1]?.focus();
      }
      setIsFetching(false); 
    }, 700); 

    return () => clearTimeout(timer);
  }, [isForgotPasswordFlow]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const pasteArray = pasteData.split("");
    const newOtp = [...otp];

    pasteArray.forEach((char, idx) => {
      newOtp[idx] = char;
      inputsRef.current[idx]?.focus();
    });

    setOtp(newOtp);
  };

  const handleResend = () => {
    clearOtpDataFromStorage();
    const newOtp = generateOTP();
    console.log("Generated OTP:", newOtp);

    const key = isForgotPasswordFlow ? 'resetPasswordOtp' : 'otp';
    saveOtpDataIntoStorage(key, newOtp);

    setTimeLeft(30);
    setOtp(Array(6).fill(""));
    inputsRef.current[0]?.focus();
  };

  const handleSubmit = () => {
    const key = isForgotPasswordFlow ? 'resetPasswordOtp' : 'otp';
    const savedOtp = sessionStorage.getItem(key);
    const fullOtp = otp.join("");

    if (fullOtp === savedOtp) {
      navigate(isForgotPasswordFlow ? "/update-password" : "/dashboard");
      clearOtpDataFromStorage();
    } else {
      setError(ErrorMsgs.INVALID_OTP_ERROR);
    }
  };

  const handleFocus = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div>
      <div className="bottom-link mt-10">
        <Link to="/update-email">Change Email Address</Link>
      </div>

      {isFetching && 
        <div className="flex-center my-15">
          <p className="text-gray-500">Just a moment, getting your OTP...</p>
        </div>
     }  
     
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
              onFocus={handleFocus}
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
            <button type="button" onClick={handleResend} className="link-button">
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