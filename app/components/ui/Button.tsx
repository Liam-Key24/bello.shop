import React from "react";

type ButtonVariant = "primary" | "glass";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-6 py-3 text-sm",
  md: "px-10 py-4 text-[15px]",
  lg: "px-12 py-5 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-button text-white hover:bg-brand-mid border border-transparent",
  glass:
    "glass-bg glass-border glass-shadow text-brand-deep hover:border-brand-mid/40",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
