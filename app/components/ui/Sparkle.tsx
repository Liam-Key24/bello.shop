type SparkleSize = "sm" | "md" | "lg";

const sizeClasses: Record<SparkleSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export interface SparkleProps {
  size?: SparkleSize;
  className?: string;
}

/** Four-point sparkle star for faint background decoration. */
export function Sparkle({ size = "md", className = "" }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M12 0.75 13.6 10.4 23.25 12 13.6 13.6 12 23.25 10.4 13.6 0.75 12 10.4 10.4Z" />
    </svg>
  );
}
