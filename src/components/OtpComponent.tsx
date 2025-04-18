import { Timer } from "lucide-react";
import  { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

const OtpComponent = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const timeToWait = '30s';
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]); // refs for inputs

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

 
  const handleSubmit =() => {
    const fullOtp = otp.join("");
    console.log(fullOtp);
  }

  return (
    <div>
      <div className="bottom-link mt-10">
        <Link to="/">Change Email Address</Link>
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
        <Timer size={16} color="#A0A0A0" strokeWidth={1.25} absoluteStrokeWidth />
        <p className="timer-text">{timeToWait}</p>
      </div>

      <PrimaryButton label="Continue" onClick={handleSubmit} />

    </div>
  );
};

export default OtpComponent;
