
interface EmailFieldProps {
  fieldLabel: string;
  placeholderText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  isRequired?: boolean;
}

const EmailField = ({ fieldLabel,  placeholderText ='navinash@workhive.com', value, onChange, errorMsg, isRequired=true }: EmailFieldProps) => {
  return (
    <div>
      <label htmlFor="userEmail" className="form-label">
        {fieldLabel}
      </label>
      <input
        id="userEmail"
        type="email"
        placeholder={placeholderText}
        className={`common-input ${errorMsg ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
};

export default EmailField;
