'use client';

import { useState, useImperativeHandle, forwardRef } from "react";
import { Envelope, WarningCircle } from "@phosphor-icons/react";

type EmailInputProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showValidation?: boolean;
  simpleError?: boolean; // Show simple "Valid email required" message
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type EmailInputRef = {
  validate: () => boolean;
};

const EmailInput = forwardRef<EmailInputRef, EmailInputProps>(({
  id,
  value,
  onChange,
  placeholder = "you@example.com",
  required = false,
  disabled = false,
  className = "",
  showValidation = true,
  simpleError = false,
  onBlur,
}, ref) => {
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);

  useImperativeHandle(ref, () => ({
    validate: () => {
      setTouched(true);
      if (required && (!value || value.trim().length === 0)) {
        setEmailErrors(["Valid email required"]);
        return false;
      } else if (value.length > 0) {
        const errors = validateEmail(value);
        setEmailErrors(errors);
        return errors.length === 0;
      }
      return !required;
    },
  }));

  const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
    
    if (!email || email.trim().length === 0) {
      if (required) {
        errors.push("Email is required");
      }
      return errors;
    }

    const trimmed = email.trim().toLowerCase();
    
    if (trimmed.length > 254) {
      errors.push("Email is too long (max 254 characters)");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      errors.push("Invalid email format");
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    onChange(e);
    
    if (showValidation) {
      if (newEmail.length > 0) {
        setEmailErrors(validateEmail(newEmail));
      } else if (touched && required) {
        setEmailErrors(["Valid email required"]);
      } else {
        setEmailErrors([]);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (required && (!value || value.trim().length === 0)) {
      setEmailErrors(["Valid email required"]);
    } else if (value.length > 0) {
      setEmailErrors(validateEmail(value));
    }
    onBlur?.(e);
  };

  return (
    <div>
      <div className="relative">
        <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" weight="regular" />
        <input
          id={id}
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full pl-12 pr-4 py-3 neumorphism-input-style ${className}`}
          disabled={disabled}
        />
      </div>
      {showValidation && emailErrors.length > 0 && (
        simpleError ? (
          <p className="mt-1 text-xs text-red-600">Valid email required</p>
        ) : (
          <div className="mt-2 p-3 bg-white border border-red-600 rounded-lg">
            <p className="text-red-600 text-xs font-semibold mb-1">Email must:</p>
            <ul className="text-red-600 text-xs space-y-0.5">
              {emailErrors.map((err, index) => (
                <li key={index} className="flex items-center gap-2">
                  <WarningCircle className="w-3 h-3 shrink-0" weight="regular" />
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
});

EmailInput.displayName = 'EmailInput';

export default EmailInput;

