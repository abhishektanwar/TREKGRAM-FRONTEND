import React, { useState } from "react";
import "./input.css";

const InputField = ({
  parentClass,
  type,
  name,
  id,
  placeholder,
  labelText,
  onChange,
  value,
  labelClass,
  required,
  validation,
  showTogglePasswordButton,
  customClass = "",
  textarea = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`flex-column form-field-container ${parentClass}`}
      style={{ position: "relative" }}
    >
      {labelText && (
        <label
          className={`input-label ${labelClass} ${
            !validation ? "invalid-field-color" : ""
          }`}
        >
          {labelText}
        </label>
      )}
      {textarea ? (
        <textarea
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required ?? false}
          rows={3}
          className={`form-field ${customClass} ${
            !validation ? "invalid-field-border" : ""
          }`}
        />
      ) : (
        <input
          className={`form-field ${customClass} ${
            !validation ? "invalid-field-border" : ""
          }`}
          type={showTogglePasswordButton && showPassword ? "text" : type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required ?? false}
        />
      )}
      {showTogglePasswordButton ? (
        <span
          role="button"
          className="toggle-password-button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <i className="far fa-eye" style={{ fontSize: "1.6rem" }}></i>
          ) : (
            <i className="far fa-eye-slash" style={{ fontSize: "1.6rem" }}></i>
          )}
        </span>
      ) : null}
    </div>
  );
};

export default InputField;
