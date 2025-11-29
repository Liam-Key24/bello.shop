'use client';

import { useState, useImperativeHandle, forwardRef } from "react";
import { Lock, WarningCircle } from "@phosphor-icons/react";

type PasswordInputProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showValidation?: boolean;
  simpleError?: boolean; // Show simple "Valid password required" message
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type PasswordInputRef = {
  validate: () => boolean;
};

const PasswordInput = forwardRef<PasswordInputRef, PasswordInputProps>(({
  id,
  value,
  onChange,
  placeholder = "Enter your password",
  required = false,
  disabled = false,
  className = "",
  showValidation = true,
  simpleError = false,
  onBlur,
}, ref) => {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);

  useImperativeHandle(ref, () => ({
    validate: () => {
      setTouched(true);
      if (required && (!value || value.length === 0)) {
        setPasswordErrors(["Valid password required"]);
        return false;
      } else if (value.length > 0) {
        const errors = validatePasswordRequirements(value);
        setPasswordErrors(errors);
        return errors.length === 0;
      }
      return !required;
    },
  }));

  const validatePasswordRequirements = (pwd: string): string[] => {
    const errors: string[] = [];
    
    if (pwd.length < 8) {
      errors.push("At least 8 characters");
    }
    
    if (!/[a-zA-Z]/.test(pwd)) {
      errors.push("At least one letter");
    }
    
    if (!/[0-9]/.test(pwd)) {
      errors.push("At least one number");
    }
    
    if (pwd.length > 128) {
      errors.push("Maximum 128 characters");
    }
    
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    onChange(e);
    
    if (showValidation) {
      if (newPassword.length > 0) {
        setPasswordErrors(validatePasswordRequirements(newPassword));
      } else if (touched && required) {
        setPasswordErrors(["Valid password required"]);
      } else {
        setPasswordErrors([]);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (required && (!value || value.length === 0)) {
      setPasswordErrors(["Valid password required"]);
    } else if (value.length > 0) {
      setPasswordErrors(validatePasswordRequirements(value));
    }
    onBlur?.(e);
  };

  return (
    <div>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" weight="regular" />
        <input
          id={id}
          type="password"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full pl-12 pr-4 py-3 neumorphism-input-style ${className}`}
          disabled={disabled}
        />
      </div>
      {showValidation && passwordErrors.length > 0 && (
        simpleError ? (
          <p className="mt-1 text-xs text-red-600">Valid password required</p>
        ) : (
          <div className="mt-2 p-3 bg-white border border-red-600 rounded-lg">
            <p className="text-red-600 text-xs font-semibold mb-1">Password must contain:</p>
            <ul className="text-red-600 text-xs space-y-0.5">
              {passwordErrors.map((err, index) => (
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

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

