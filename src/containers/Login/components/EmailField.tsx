const EmailField = ({
  fieldLabel,
  placeholderText = "navinash@workhive.com",
}: {
  fieldLabel: string;
  placeholderText?: string;
}) => {
  return (
    <div>
      <label htmlFor="userEmail" className="form-label">
        {fieldLabel}
      </label>
      <input
        id="userEmail"
        type="email"
        placeholder={placeholderText}
        className="common-input"
      />
    </div>
  );
};

export default EmailField;
