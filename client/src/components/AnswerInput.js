import React from "react";

export default function AnswerInput({
  callback,
  type = "text",
  disabled = false,
  readOnly = false,
  placeholder = "",
  className,
  value
}) {
  return (
    <input
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => callback(value)}
      className={className}
      value = {value}
    />
  );
}
