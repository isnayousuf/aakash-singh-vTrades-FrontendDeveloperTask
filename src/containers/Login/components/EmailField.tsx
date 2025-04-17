
interface EmailFieldProps {
  fieldLabel: string;
  placeholderText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  isRequired?: boolean;
  setFormErrors: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>; 

}

const EmailField = ({ fieldLabel,  placeholderText ='navinash@workhive.com', value, onChange, errorMsg, isRequired=true, setFormErrors }: EmailFieldProps) => {
  const handleFocus = () => {
    if (errorMsg) {
      setFormErrors((prev) => ({ ...prev, email: '' })); 
    }
  };
  return (
    <div>
      <label htmlFor="userEmail" className="form-label">
        {fieldLabel}
      </label>
      <input
        id="userEmail"
        type="email"
        name="email"
        placeholder={placeholderText}
        className={`common-input ${errorMsg ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
        required={isRequired}
        onFocus={handleFocus}
      />
      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
};

export default EmailField;
